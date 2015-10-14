import React from 'react';
import Layout from './layout';

export default React.createClass({
  propTypes: {
    package: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  },
  render() {
    return (
      <Layout>
        <h1>Package {this.props.package}</h1>
        <p>Status: {this.props.status}</p>
      </Layout>
    );
  },
});
