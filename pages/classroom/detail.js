import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

import Loader from '../../components/commons/Loader'
import Protected from '../../components/commons/Protected'

import { getClassroomDetail } from '../../redux/classroom'
import { checkLogin } from '../../redux/user'

import NotFound from '../../components/classroom/NotFound'

const Classroom = dynamic(import('../../components/pages/classroom/detail'), {
  loading: () => <Loader />
})

const enhance = compose(
  connect(
    (state) => state,
    { getClassroomDetail, checkLogin }
  )
)

class ClassroomPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  componentDidMount () {
    const {
      getClassroomDetail,
      query: { id }
    } = this.props

    getClassroomDetail(id)
  }

  render () {
    const {
      classroom: {
        loading,
        classroom,
        classroom: { found }
      }
    } = this.props

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
        <Protected>{found ? <Classroom classroom={classroom} /> : !loading && <NotFound />}</Protected>
      </Fragment>
    )
  }
}

export default enhance(ClassroomPage)
