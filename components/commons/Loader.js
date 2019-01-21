import React from 'react'
import { RingLoader } from 'react-spinners'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fefefe;
  z-index: 1000;
`

const Loader = () => (
  <Container>
    <RingLoader size={180} color='#6d00ed' />
  </Container>
)

export default Loader
