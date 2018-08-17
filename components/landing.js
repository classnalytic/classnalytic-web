import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Container from '../components/commons/Container';
import Card from '../components/commons/Card';
import Image from '../components/commons/Image';
import Button from '../components/commons/Button';
import CreditBox from '../components/commons/CreditBox';

import Poster from './assets/poster.jpg';

const ImageBox = styled.div`
  padding: 0 10%;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 2.7em;
`;

const Subtitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: -1.2em;
  margin-bottom: 1.5em;
  font-weight: 300;
  color: #525252;
`;

const LoginButton = Button.extend`
  cursor: pointer;
`;

export default () => (
  <Container>
    <Card>
      <ImageBox>
        <Image src={Poster} />
      </ImageBox>
      <Title>เปิดโลกชุมนุม</Title>
      <Subtitle>15 สิงหาคม 2561</Subtitle>

      <Link href="/login">
        <LoginButton>เข้าสู่ระบบด้วยรหัส IT</LoginButton>
      </Link>
      <CreditBox />
    </Card>
  </Container>
);
