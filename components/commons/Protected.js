import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkLogin } from '../../redux/user'

class Protected extends Component {
  static async getInitialProps ({ store }) {
    return { ...store }
  }

  render () {
    const {
      children,
      user: { login },
      checkLogin
    } = this.props

    checkLogin()

    return login ? children : <></>
  }
}

export default connect(
  state => state,
  { checkLogin }
)(Protected)
