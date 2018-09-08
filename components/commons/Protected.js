import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Router from 'next/router';

import { checkLogin } from '../../redux/user';

const enhance = compose(
  connect(
    (state) => state,
    { checkLogin }
  )
);

class Protected extends Component {
  static async getInitialProps({ store }) {
    return { ...store };
  }

  render() {
    const {
      children,
      user: { login },
      checkLogin
    } = this.props;

    checkLogin();

    return login ? children : <div />;
  }
}

export default enhance(Protected);