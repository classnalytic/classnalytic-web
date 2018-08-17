import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import dynamic from 'next/dynamic';

import Loader from '../components/commons/Loader';

const Landing = dynamic(import('../components/landing'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    {}
  )
);

const LandingPage = () => <Landing />;

export default enhance(LandingPage);
