import EmbraceLogger from '../../src/logger';
import Wizard from '../util/wizard';
import { patchBuildGradle } from './android';

const logger = new EmbraceLogger(console);

logger.log('initializing update wizard');

const androidSteps = [patchBuildGradle];

const run = () => {
  const wiz = new Wizard();
  [...androidSteps].map((step) => wiz.registerStep(step));
  wiz
    .runSteps()
    .then(() => {
      logger.log('done');
    })
    .catch((err) => logger.error('error in setting up Embrace: ' + err));
};

export default run;
