import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import styles from 'styles/style.less'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags, helmet: Helmet.renderStatic() }
  }

  // should render on <html>
  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  // get helmetHeadComponents () {
  //   return Object.keys(this.props.helmet)
  //     .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
  //     .map(el => this.props.helmet[el].toComponent())
  // }

  get helmetJsx () {
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title='Classnalytic'
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: 'Classnalytic' }
        ]}
        link={[{ rel: 'shortcut icon', type: 'image/png', href: `` }]}
      />
    )
  }

  render () {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          <link
            href='https://fonts.googleapis.com/css?family=Sarabun:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i&amp;subset=thai'
            rel='stylesheet'
          />
          {this.props.styleTags}
          <style dangerouslySetInnerHTML={{ __html: styles }} />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
