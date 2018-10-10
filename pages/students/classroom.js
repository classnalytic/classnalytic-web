import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

import Loader from '../../components/commons/Loader'
import Protected from '../../components/commons/Protected'

import { getClassroomDetail } from '../../redux/classroom'
import { checkLogin } from '../../redux/user'

import NotFound from '../../components/classroom/NotFound'

const Overview = dynamic(import('../../components/pages/student/classroom'), {
  loading: () => <Loader />
})

class StudentClassroomPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  componentDidMount () {
    const { getClassroomDetail, query: { id } } = this.props

    getClassroomDetail(id)
  }

  render () {
    const { classroom: { loading, classroom, classroom: { found } } } = this.props

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Control Panel'
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>{found ? <Overview classroom={classroom} /> : !loading && <NotFound />}</Protected>
      </Fragment>
    )
  }
}

export default connect(state => state, { getClassroomDetail, checkLogin })(StudentClassroomPage)
