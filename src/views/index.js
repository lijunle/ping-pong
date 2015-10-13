import React from 'react';
import Layout from './layout';
import { logger } from '../services';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render() {
    logger.debug('[view:index] render index view.');

    return <Layout>Hello {this.props.name}!</Layout>;
  },
});
