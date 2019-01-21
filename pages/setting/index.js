import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Tabs } from 'antd'

import Loader from '../../components/commons/Loader'
import Button from '../../components/commons/Button'
import Title from '../../components/commons/Title'
import Container from '../../components/commons/Container'
import Protected from '../../components/commons/Protected'

import { checkLogin } from '../../redux/user'

const TabPane = Tabs.TabPane

const ClassroomList = dynamic(
  import('../../components/pages/setting/classroom/list'),
  {
    loading: () => <Loader />
  }
)
const SubjectList = dynamic(
  import('../../components/pages/setting/subject/list'),
  {
    loading: () => <Loader />
  }
)
const RoomList = dynamic(import('../../components/pages/setting/room/list'), {
  loading: () => <Loader />
})

const ModelTrain = dynamic(import('../../components/pages/setting/train'), {
  loading: () => <Loader />
})

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
      <Fragment>
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
            <Title>Settings</Title>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Classrooms' key='1'>
                <Link href='/setting/classroom/new'>
                  <NewButton>New Classroom</NewButton>
                </Link>
                <br />
                <br />
                <ClassroomList />
              </TabPane>
              <TabPane tab='Rooms' key='2'>
                <Link href='/setting/room/new'>
                  <NewButton>New Room</NewButton>
                </Link>
                <br />
                <br />
                <RoomList />
              </TabPane>
              <TabPane tab='Subjects' key='3'>
                <Link href='/setting/subject/new'>
                  <NewButton>New Subject</NewButton>
                </Link>
                <br />
                <br />
                <SubjectList />
              </TabPane>
              <TabPane tab='Model' key='4'>
                <ModelTrain />
              </TabPane>
            </Tabs>
          </Wrapper>
        </Protected>
      </Fragment>
    )
  }
}

export default connect(
  state => state,
  { checkLogin }
)(SettingIndexPage)
