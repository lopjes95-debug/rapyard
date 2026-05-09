import { getConfigValue } from './remoteConfig';
export function isExperimentEnabled(name) { return getConfigValue('exp_' + name) === 'on'; }
