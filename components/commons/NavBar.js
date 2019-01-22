import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
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
`

const Title = styled.p`
  display: flex;
  font-size: 1.2em;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  margin: 0;
  padding: 0;
`

const MenuWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
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

const MenuUserName = styled(Menu)`
  cursor: text;
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
        info: { role, firstname, lastname }
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
                {role === 'admin' && (
                  <>
                    <Link href='/students'>
                      <Menu>
                        <Icon type='user' /> Students
                      </Menu>
                    </Link>
                    <Link href='/setting'>
                      <Menu>
                        <Icon type='setting' /> Settings
                      </Menu>
                    </Link>
                  </>
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
                <MenuUserName>
                  {firstname} {lastname}
                </MenuUserName>
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

NavBar.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.bool
  }),
  doLogout: PropTypes.func
}

export default enhance(NavBar)
