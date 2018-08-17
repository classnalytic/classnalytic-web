import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import dynamic from 'next/dynamic';

import Loader from '../components/commons/Loader';

const Login = dynamic(import('../components/login'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    {}
  )
);

const LoginPage = () => <Login />;

export default enhance(LoginPage);
