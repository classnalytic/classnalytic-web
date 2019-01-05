import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import Icon from 'antd/lib/icon'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import styled from 'styled-components'

import { doLogout } from '../../redux/user'

const Container = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  width: 100%;
  padding: 1.2em 1.5em;
  z-index: 32;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  box-align: center;
`

const Title = styled.p`
  display: flex;
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  margin: 0;
  padding: 0;
`

const MenuWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  list-style: none;
`

const MenuGroup = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Menu = styled.li`
  display: list-item;
  margin-left: 1.4em;
  font-size: 1.2em;
  font-weight: 300;
  color: #000;
  padding-inline-start: 0;
  cursor: pointer;
`

const LogoutButton = styled(Menu)`
  color: #f00;
`

const enhance = compose(
  connect(
    state => state,
    { doLogout }
  )
)

class NavBar extends Component {
  static async getInitialProps ({ store }) {
    return { ...store }
  }

  render () {
    const {
      user: {
        login,
        info: { role }
      },
      doLogout
    } = this.props

    return (
      <Container>
        <MenuHeader>
          <Link href='/'>
            <Title>Classnalytic</Title>
          </Link>
        </MenuHeader>
        <MenuWrapper>
          <MenuGroup>
            {login ? (
              <Fragment>
                <Link href='/dashboard'>
                  <Menu>
                    <Icon type='dashboard' /> Dashboard
                  </Menu>
                </Link>
                <Link href='/students'>
                  <Menu>
                    <Icon type='user' /> Students
                  </Menu>
                </Link>
                {role === 'admin' && (
                  <Link href='/setting'>
                    <Menu>
                      <Icon type='setting' /> Settings
                    </Menu>
                  </Link>
                )}
              </Fragment>
            ) : (
              <>
                <Link href='/'>
                  <Menu>
                    <Icon type='home' /> Home
                  </Menu>
                </Link>
              </>
            )}
          </MenuGroup>
          <MenuGroup>
            {login ? (
              <>
                <LogoutButton onClick={() => doLogout()}>
                  <Icon type='logout' /> Logout
                </LogoutButton>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <Menu>
                    <Icon type='login' /> Login
                  </Menu>
                </Link>
              </>
            )}
          </MenuGroup>
        </MenuWrapper>
      </Container>
    )
  }
}

export default enhance(NavBar)
