import React, { Component } from 'react';
import styled from 'styled-components';

// Common Components
import Container from '../../commons/Container';
import CreditBox from '../../commons/CreditBox';
import Title from '../../commons/Title';
import Subtitle from '../../commons/Subtitle';
import Box from '../../commons/Box';
import Image from '../../commons/Image';

import SuccessIcon from './assets/success.svg';

const Success = styled(Box)`
  background-color: #ffffff;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  padding: 2em 2em;
  max-width: 300px;
  margin: 2em auto 0 auto;

  @media (max-width: 320px) {
    padding: 1em;
  }
`;

const SuccessImage = styled(Image)`
  padding: 2em;
  box-shadow: none;
`;

class StudentSuccess extends Component {
  componentDidMount() {
    this.props.setLoading(false);
  }

  render() {
    return (
      <Container>
        <Success>
          <SuccessImage src={SuccessIcon} />
          <Title>Success!</Title>
          <Subtitle>Welcome new member</Subtitle>
        </Success>
        <CreditBox />
      </Container>
    );
  }
}

export default StudentSuccess;
