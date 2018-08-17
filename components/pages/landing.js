import React from 'react';
import Link from 'next/link';

import Container from '../commons/Container';
import Card from '../commons/Card';
import Button from '../commons/Button';
import CreditBox from '../commons/CreditBox';
import Title from '../commons/Title';
import Subtitle from '../commons/Subtitle';

const LoginButton = Button.extend`
  cursor: pointer;
`;

const SubtitleText = Subtitle.extend`
  margin-bottom: 1.5em;
`;

export default () => (
  <Container>
    <Card>
      <Title>Smart Classroom</Title>
      <SubtitleText>Make classroom great again</SubtitleText>

      <Link href="/login">
        <LoginButton>Sign in</LoginButton>
      </Link>
      <CreditBox />
    </Card>
  </Container>
);
