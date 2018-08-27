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

const EmotionTitle = Title.extend`
  font-size: 2em;
  text-decoration: underline;
`;

const EmotionStatus = () => {
  return (
    <EmotionContainer>
      <Row>
        <Col span={24}>
          <EmotionTitle>Overall Emotions</EmotionTitle>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <Image src={Anger} />
        </Col>
        <Col span={3}>
          <Image src={Contempt} />
        </Col>
        <Col span={3}>
          <Image src={Disgust} />
        </Col>
        <Col span={3}>
          <Image src={Fear} />
        </Col>
        <Col span={3}>
          <Image src={Happy} />
        </Col>
        <Col span={3}>
          <Image src={Neutral} />
        </Col>
        <Col span={3}>
          <Image src={Surprise} />
        </Col>
        <Col span={3} />
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <EmotionPercent>10%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>15%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>1%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>0%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>60%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>10%</EmotionPercent>
        </Col>
        <Col span={3}>
          <EmotionPercent>4%</EmotionPercent>
        </Col>
        <Col span={3} />
      </Row>
    </EmotionContainer>
  );
};

export default EmotionStatus;
