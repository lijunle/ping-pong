import React from 'react';
import Layout from './layout';

export default React.createClass({
  propTypes: {
    package: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    createTime: React.PropTypes.object.isRequired,
    startTime: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      startTime: '',
    };
  },
  render() {
    return (
      <Layout>
        <h1>Package {this.props.package}</h1>
        <p>Status: {this.props.status}</p>
        <p>Create Time: {this.props.createTime.toString()}</p>
        <p>Start Time: {this.props.startTime.toString()}</p>
      </Layout>
    );
  },
});
