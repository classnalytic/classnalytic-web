import { Row, Col } from 'antd';
import styled from 'styled-components';

import Title from '../commons/Title';

import Anger from './assets/emotion_anger.svg';
import Contempt from './assets/emotion_contempt.svg';
import Disgust from './assets/emotion_disgust.svg';
import Fear from './assets/emotion_fear.svg';
import Happy from './assets/emotion_happy.svg';
import Neutral from './assets/emotion_neutral.svg';
import Surprise from './assets/emotion_surprise.svg';
import Sadness from './assets/emotion_sad.svg';

const Image = styled.img`
  width: 100%;
  max-height: auto;
`;

const EmotionContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
`;

const EmotionPercent = styled.div`
  width: 100%;
  text-align: center;
`;

const EmotionTitle = styled(Title)`
  width: 100%;
  font-size: 2em;
  text-decoration: underline;
`;

const EmotionStatus = ({ emotions }) => {
  let { fear, sadness, neutral, surprise, happiness, contempt, disgust, anger } = emotions;
  return (
    <EmotionContainer>
      <Row>
        <EmotionTitle>Overall Emotions</EmotionTitle>
      </Row>
      <Row gutter={16}>
        <Col md={3}>
          <Image src={Anger} />
        </Col>
        <Col md={3}>
          <Image src={Contempt} />
        </Col>
        <Col md={3}>
          <Image src={Disgust} />
        </Col>
        <Col md={3}>
          <Image src={Sadness} />
        </Col>
        <Col md={3}>
          <Image src={Fear} />
        </Col>
        <Col md={3}>
          <Image src={Happy} />
        </Col>
        <Col md={3}>
          <Image src={Neutral} />
        </Col>
        <Col md={3}>
          <Image src={Surprise} />
        </Col>
        <Col />
      </Row>
      <Row gutter={16}>
        <Col md={3}>
          <EmotionPercent>{anger}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{contempt}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{disgust}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{sadness}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{fear}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{happiness}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{neutral}%</EmotionPercent>
        </Col>
        <Col md={3}>
          <EmotionPercent>{surprise}%</EmotionPercent>
        </Col>
      </Row>
    </EmotionContainer>
  );
};

export default EmotionStatus;
