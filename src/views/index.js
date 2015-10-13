import React from 'react';
import Layout from './layout';

export default React.createClass({
  getInitialState() {
    return {
      packageName: '',
    };
  },
  render() {
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
