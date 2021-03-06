import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

import Loader from '../../../components/commons/Loader'
import Protected from '../../../components/commons/Protected'

import { checkLogin } from '../../../redux/user'

const Overview = dynamic(import('../../../components/pages/student/classroom'), {
  loading: () => <Loader />
})

class SettingClassroomPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  render () {
    return (
      <Fragment>
        {/* {loading && <Loader />} */}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Edit Classroom'
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>Classroom Edit</Protected>
      </Fragment>
    )
  }
}

export default connect(state => state, { checkLogin })(SettingClassroomPage)
