import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { checkLogin } from '../../redux/user';

const enhance = compose(
  connect(
    (state) => state,
    { checkLogin }
  ),
  lifecycle({
    componentWillMount() {
      const { checkLogin } = this.props;
      checkLogin();
    }
  })
);

class Protected extends Component {
  static async getInitialProps({ store }) {
    return { ...store };
  }

  render() {
    const { Component } = this.props;

    return <Component />;
  }
}

export default enhance(Protected);
