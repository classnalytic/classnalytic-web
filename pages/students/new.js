import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';
import dynamic from 'next/dynamic';

import Loader from '../../components/commons/Loader';
import Protected from '../../components/commons/Protected';

const Student = dynamic(import('../../components/pages/student/new'), {
  loading: () => <Loader />
});

const enhance = compose(
  connect(
    (state) => state,
    {}
  )
);

class StudentNewPage extends Component {
  static async getInitialProps({ store, query }) {
    return { ...store, query };
  }

  render() {
    const {
      student: { loading }
    } = this.props;

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title="Classnalytic | New Student"
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>
          <Student />
        </Protected>
      </Fragment>
    );
  }
}

export default enhance(StudentNewPage);
