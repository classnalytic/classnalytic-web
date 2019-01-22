import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Helmet from 'react-helmet'

import Loader from '../components/commons/Loader'
import Protected from '../components/commons/Protected'

import { setClassrooms, setLoading } from '../redux/classroom'

import Dashboard from '../components/pages/dashboard'

const enhance = compose(
  connect(
    state => state,
    { setClassrooms, setLoading }
  )
)

class DashboardPage extends Component {
  static async getInitialProps ({ store }) {
    return { ...store }
  }

  componentDidMount () {
    this.props.setClassrooms()
  }

  render () {
    const {
      classroom: { loading, classrooms },
      setLoading
    } = this.props

    return (
      <Fragment>
        {loading && <Loader />}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Dashboard'
          meta={[
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
            },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>
          {!classrooms.success && (
            <Dashboard classrooms={classrooms} setLoading={setLoading} />
          )}
        </Protected>
      </Fragment>
    )
  }
}

DashboardPage.propTypes = {
  classroom: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    classrooms: PropTypes.array.isRequired
  }),
  setLoading: PropTypes.func,
  setClassrooms: PropTypes.func.isRequired
}

export default enhance(DashboardPage)
