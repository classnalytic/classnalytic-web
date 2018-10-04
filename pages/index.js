import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

import Loader from '../components/commons/Loader'

const Landing = dynamic(import('../components/pages/landing'), {
  loading: () => <Loader />
})

const enhance = compose(
  connect(
    (state) => state,
    {}
  )
)

const LandingPage = () => (
  <Fragment>
    <Helmet
      htmlAttributes={{ lang: 'th' }}
      title='Classnalytic'
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { property: 'og:title', content: 'Classnalytic' }
      ]}
    />
    <Landing />
  </Fragment>
)

export default enhance(LandingPage)
