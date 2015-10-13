import React from 'react';
import { logger } from '../services';

export default React.createClass({
  render() {
    logger.debug('[view:index] render index view.');

    return <div>Hello {this.props.name}!</div>;
  },
});
