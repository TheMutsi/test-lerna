const fs = require('fs');
const path = require('path');

import EmbraceLogger from '../../src/logger';
import {
  buildAppGradlePatchable,
  buildGradlePatchable,
  embraceJSON,
  embraceJSONContents,
  mainApplicationPatchable,
} from '../util/android';
import { NoopFile } from '../util/file';
import { FileUpdatable } from '../util/file';
import Wizard from '../util/wizard';
import { androidAppID, apiToken, packageJSON } from './common';

const logger = new EmbraceLogger(console);

const androidToolsBuildGradleRE =
  /(\s+)classpath(\(|\s)("|')com\.android\.tools\.build:gradle:.+("|')\)?/;

const androidEmbraceSwazzler =
  /classpath(\(|\s)('|")io\.embrace:embrace-swazzler:.*('|")\)?/;

const embraceAndroidSDKVersion = '5.5.3';

export const patchBuildGradle = {
  name: 'patch build.gradle',
  run: (wizard: Wizard): Promise<any> => {
    return buildGradlePatchable().then((file) => {
      if (file.hasLine(androidToolsBuildGradleRE)) {
        if (file.hasLine(androidEmbraceSwazzler)) {
          file.deleteLine(androidEmbraceSwazzler);
        }
        logger.log('Patching build.gradle file');
        file.addAfter(
          androidToolsBuildGradleRE,
          `classpath(\'io.embrace:embrace-swazzler:${embraceAndroidSDKVersion}\')`
        );
        file.patch();
        return;
      }

      logger.warn('Can\'t find file with com.android.tools.build:gradle');
      return;
    });
  },
};

const androidPlugin = /apply plugin: ("|')com.android.application("|')/;
const androidEmbraceSwazzlerPluginRE =
  /apply plugin: ('|")embrace-swazzler('|")/;
const androidEmbraceSwazzlerPlugin = 'apply plugin: \'embrace-swazzler\'';

export const patchAppBuildGradle = {
  name: 'patch app/build.gradle',
  run: (wizard: Wizard): Promise<any> => {
    return buildAppGradlePatchable().then((file) => {
      if (file.hasLine(androidPlugin)) {
        if (file.hasLine(androidEmbraceSwazzlerPluginRE)) {
          logger.warn('already has Embrace Swazzler plugin');
        } else {
          logger.log('patching app/build.gradle file');
          file.addAfter(androidPlugin, '\n' + androidEmbraceSwazzlerPlugin);
        }

        file.patch();
        return;
      }
      logger.warn('Can\'t find line: apply plugin: "com.android.application"');
      return;
    });
  },
};

export const createEmbraceJSON = {
  name: 'create Embrace JSON file',
  run: (wizard: Wizard): Promise<any> => {
    return new Promise<FileUpdatable>((resolve: any) => {
      const p = path.join(
        'android',
        'app',
        'src',
        'main',
        'embrace-config.json'
      );
      if (fs.existsSync(p)) {
        logger.log('already has embrace-config.json file');
        return resolve(NoopFile);
      }
      fs.closeSync(fs.openSync(p, 'a'));
      return resolve(embraceJSON());
    }).then((file: FileUpdatable) => {
      if (file === NoopFile) {
        return;
      }
      return wizard.fieldValueList([androidAppID, apiToken]).then((list) => {
        const [id, token] = list;
        file.contents = embraceJSONContents({ appID: id, apiToken: token });
        return file.patch();
      });
    });
  },
};

const embraceInit =
  'Embrace.getInstance().start(this, false, Embrace.AppFramework.REACT_NATIVE);';
const embraceImport = 'import io.embrace.android.embracesdk.Embrace;';
export const patchMainApplication = {
  name: 'patch MainApplication.java file',
  run: (wizard: Wizard): Promise<any> => {
    return wizard.fieldValue(packageJSON).then((json) => {
      return mainApplicationPatchable(json).then((file) => {
        if (file.hasLine(embraceImport)) {
          logger.warn('already has import in MainApplication.java');
        } else {
          logger.warn('adding import line to MainApplication.java');
          file.addBefore(
            'import android.app.Application;',
            embraceImport + '\n'
          );
        }
        if (file.hasLine(embraceInit)) {
          logger.warn('already has init function in MainApplication.java');
        } else {
          logger.warn('adding init function in MainApplication.java');
          file.addAfter(/(\s+)super\.onCreate\(\);/, embraceInit);
        }
        return file.patch();
      });
    });
  },
};
