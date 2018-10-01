import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../lib/redux'
import { PersistGate } from 'redux-persist/integration/react'

import Loader from '../components/commons/Loader'
import NavBar from '../components/commons/NavBar'

export default withRedux(makeStore, { debug: false })(
  class MyApp extends App {
    render () {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <PersistGate persistor={store.__persistor} loading={<Loader />}>
              <NavBar />
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </Container>
      )
    }
  }
)
