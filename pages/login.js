import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'
import Router from 'next/router'

import Loader from '../components/commons/Loader'

import { doLogin, setLoading } from '../redux/user'

const Login = dynamic(import('../components/pages/login'), {
  loading: () => <Loader />
})

// import Login from '../components/pages/login'

const enhance = compose(
  connect(
    state => state,
    { doLogin, setLoading }
  )
)

class LoginPage extends Component {
  static async getInitialProps ({ store }) {
    return { ...store }
  }

  render () {
    const {
      user,
      user: { login },
      doLogin,
      setLoading
    } = this.props

    if (user.login) {
      Router.push('/dashboard')
    }

    return (
      <Fragment>
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Login'
          meta={[
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
            },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        {!login && (
          <Login user={user} doLogin={doLogin} setLoading={setLoading} />
        )}
      </Fragment>
    )
  }
}

export default enhance(LoginPage)
