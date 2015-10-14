import React from 'react';
import Layout from './layout';

const Package = item => (
  <li>
    {item.package}
    {' '}
    {item.status}
  </li>
);

export default React.createClass({
  propTypes: {
    packages: React.PropTypes.array.isRequired,
  },
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
        <ul>
          {this.props.packages.map(item => <Package key={item._id} {...item} />)}
        </ul>
      </Layout>
    );
  },
});
