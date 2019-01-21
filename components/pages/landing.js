import React from 'react'
import styled from 'styled-components'

import Link from 'next/link'

import Container from '../commons/Container'
import Card from '../commons/Card'
import Button from '../commons/Button'
import CreditBox from '../commons/CreditBox'
import Title from '../commons/Title'
import Subtitle from '../commons/Subtitle'

const LoginButton = styled(Button)`
  background-color: #6d00ed;
  width: 100%;
  max-width: 450px;
  color: #fff;
  padding: 1.2em;
  font-size: 1.5em;
  font-weight: 300;
  outline: none;
  cursor: pointer;
`

const LandingTitle = styled(Title)`
  text-align: center;
`

const SubtitleText = styled(Subtitle)`
  margin-bottom: 1.5em;
`

const Wrapper = styled(Card)`
  text-align: center;
`

export default () => (
  <Container>
    <Wrapper>
      <LandingTitle>Classnalytic</LandingTitle>
      <SubtitleText>Make classroom great again</SubtitleText>

      <Link href='/login'>
        <LoginButton>Login</LoginButton>
      </Link>
      <CreditBox />
    </Wrapper>
  </Container>
)
