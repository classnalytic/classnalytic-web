import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Helmet from 'react-helmet';
import dynamic from 'next/dynamic';

import Loader from '../../components/commons/Loader';

import { getClassroomDetail } from '../../redux/classroom';
import { checkLogin } from '../../redux/user';

const Classroom = dynamic(import('../../components/pages/classroom/detail'), {
  loading: () => <Loader />
});

import NotFound from '../../components/classroom/NotFound';

const enhance = compose(
  connect(
    (state) => state,
    { getClassroomDetail, checkLogin }
  )
  // lifecycle({
  //   componentWillMount() {
  //     const { checkLogin } = this.props;
  //     checkLogin();
  //   }
  // })
);

class ClassroomPage extends Component {
  static async getInitialProps({ store, query }) {
    return { ...store, query };
  }

  componentDidMount() {
    const {
      getClassroomDetail,
      checkLogin,
      query: { id }
    } = this.props;

    checkLogin();

    getClassroomDetail(id);
  }

  render() {
    const {
      classroom: {
        loading,
        classroom,
        classroom: { found }
      }
    } = this.props;

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title="Classnalytic | Control Panel"
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        {found ? <Classroom classroom={classroom} /> : <NotFound />}
      </Fragment>
    );
  }
}

export default enhance(ClassroomPage);
