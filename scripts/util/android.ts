const fs = require('fs');
const path = require('path');
import { FileUpdatable, getFileContents } from './file';

export const buildGradlePatchable = (): Promise<FileUpdatable> => {
  return new Promise((resolve, reject) => {
    const gradlePath = path.join('android', 'build.gradle');
    if (!fs.existsSync(gradlePath)) {
      return reject(`cannot find build.gradle file at ${gradlePath}`);
    }
    return resolve(getFileContents(gradlePath));
  });
};

export const buildAppGradlePatchable = (): Promise<FileUpdatable> => {
  return new Promise((resolve, reject) => {
    const appGradlePath = path.join('android', 'app', 'build.gradle');
    if (!fs.existsSync(appGradlePath)) {
      return reject(`cannot find build.gradle file at ${appGradlePath}`);
    }
    return resolve(getFileContents(appGradlePath));
  });
};

export const embraceJSON = (): Promise<FileUpdatable> => {
  return new Promise((resolve, reject) => {
    const p = path.join('android', 'app', 'src', 'main', 'embrace-config.json');
    if (!fs.existsSync(p)) {
      return reject(`cannot find embrace-config.json file at ${p}`);
    }
    return resolve(getFileContents(p));
  });
};

export const mainApplicationPatchable = ({
  name = '',
}): Promise<FileUpdatable> => {
  return new Promise<FileUpdatable>((resolve, reject) => {
    const p = path.join(
      'android',
      'app',
      'src',
      'main',
      'java',
      'com',
      name.toLowerCase(),
      'MainApplication.java'
    );
    if (!fs.existsSync(p)) {
      return reject(`cannot find MainApplication.java file at ${p}`);
    }
    return resolve(getFileContents(p));
  });
};

export const embraceJSONContents = (params: {
  appID: string;
  apiToken: string;
}) => {
  return `{
    "app_id": "${params.appID}",
    "api_token": "${params.apiToken}"
}`;
};
