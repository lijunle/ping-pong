import React from 'react';
import Layout from './layout';
import { logger } from '../services';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  getInitialState() {
    return {
      packageName: '',
    };
  },
  render() {
    logger.debug('[view:index] render index view.');

    return (
      <Layout>
        <form method="post" action="/packages/new">
          <input
            type="input"
            name="packageName"
            placeholder="Package name"
            value={this.state.packageName}
          />
          <input
            type="submit"
            value="New"
          />
        </form>
      </Layout>
    );
  },
});
