import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

import Loader from '../../components/commons/Loader'
import Protected from '../../components/commons/Protected'

import { setResult, setStudentId, setLoading } from '../../redux/student'

const StudentNew = dynamic(import('../../components/pages/student/new'), {
  loading: () => <Loader />
})

const StudentSelect = dynamic(import('../../components/pages/student/select'), {
  loading: () => <Loader />
})

const enhance = compose(
  connect(
    (state) => state,
    { setResult, setStudentId, setLoading }
  )
)

class StudentNewPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  render () {
    const {
      student: { loading, studentId, result },
      setResult,
      setLoading,
      setStudentId
    } = this.props

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | New Student'
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>
          {!result.length ? (
            <StudentNew setResult={setResult} setStudentId={setStudentId} setLoading={setLoading} />
          ) : (
            <StudentSelect studentId={studentId} setLoading={setLoading} result={result} />
          )}
        </Protected>
      </Fragment>
    )
  }
}

export default enhance(StudentNewPage)
