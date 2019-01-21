import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Link from 'next/link'

import Button from '../../components/commons/Button'
import Title from '../../components/commons/Title'
import Container from '../../components/commons/Container'
import Protected from '../../components/commons/Protected'

import { checkLogin } from '../../redux/user'

import StudentList from '../../components/pages/student/list'

const NewButton = styled(Button)`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #00c851;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #007e33;
  }
`

const TrainButton = styled(Button)`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #5bc0de;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #31b0d5;
  }
`

const Wrapper = styled(Container)`
  max-width: 50%;
  margin: 0 auto;
`

class SettingIndexPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  render () {
    return (
      <>
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Classroom List'
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
          <Wrapper>
            <Title>Students List</Title>
            <Link href='/students/new'>
              <NewButton>New Student</NewButton>
            </Link>{' '}
            <Link href='/students/train'>
              <TrainButton>Train Student</TrainButton>
            </Link>
            <br />
            <br />
            <StudentList />
          </Wrapper>
        </Protected>
      </>
    )
  }
}

export default connect(
  state => state,
  { checkLogin }
)(SettingIndexPage)
