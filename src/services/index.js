import azure from './azure';
import local from './local';
import { provider } from './configuration';

function choose() {
  switch (provider) {
  case 'azure':
    return azure;
  case 'local':
  default:
    return local;
  }
}

export default choose();
