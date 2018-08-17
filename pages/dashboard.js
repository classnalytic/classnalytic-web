import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';
import dynamic from 'next/dynamic';

import Loader from '../components/commons/Loader';

const Dashboard = dynamic(import('../components/pages/dashboard'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    {}
  )
);

class DashboardPage extends Component {
  static async getInitialProps({ store }) {
    return { ...store };
  }

  render() {
    return (
      <Fragment>
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title="Smart Classroom | Dashboard"
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Smart Classroom' }
          ]}
        />
        <Dashboard />
      </Fragment>
    );
  }
}

export default enhance(DashboardPage);
