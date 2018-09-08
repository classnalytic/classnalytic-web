import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';
import dynamic from 'next/dynamic';

import Loader from '../components/commons/Loader';
import Protected from '../components/commons/Protected';

import { setClassrooms } from '../redux/classroom';

const Dashboard = dynamic(import('../components/pages/dashboard'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    { setClassrooms }
  )
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
        <Protected>{!classrooms.success && <Dashboard classrooms={classrooms} />}</Protected>
      </Fragment>
    );
  }
}

export default enhance(DashboardPage);
