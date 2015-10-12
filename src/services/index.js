import azure from './azure';
import { provider } from './configuration';

function choose() {
  switch (provider) {
  case 'azure':
  default:
    return azure;
  }
}

export default choose();
