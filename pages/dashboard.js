import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Helmet from 'react-helmet';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import Loader from '../components/commons/Loader';

import { setClassrooms } from '../redux/classroom';
import { checkLogin } from '../redux/user';

const Dashboard = dynamic(import('../components/pages/dashboard'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    { setClassrooms, checkLogin }
  ),
  lifecycle({
    componentWillMount() {
      const { checkLogin } = this.props;
      checkLogin();
    }
  })
);

class DashboardPage extends Component {
  static async getInitialProps({ store }) {
    return { ...store };
  }

  componentDidMount() {
    this.props.setClassrooms();
  }

  render() {
    const {
      classroom: { loading, classrooms }
    } = this.props;

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title="Classnalytic | Dashboard"
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        {typeof classrooms.success === 'undefined' && <Dashboard classrooms={classrooms} />}
      </Fragment>
    );
  }
}

export default enhance(DashboardPage);
