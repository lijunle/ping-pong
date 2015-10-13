import React from 'react';
import { logger } from '../services';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render() {
    logger.debug('[view:index] render index view.');

    return <div>Hello {this.props.name}!</div>;
  },
});
