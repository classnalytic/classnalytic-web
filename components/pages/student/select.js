import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';

// Common Components
import Container from '../../commons/Container';
import CreditBox from '../../commons/CreditBox';
import Title from '../../commons/Title';
import Subtitle from '../../commons/Subtitle';
import Image from '../../commons/Image';

const ImageWrapper = styled('div')`
  display: inline-block;
  width: 25%;
  padding: 1em 0.5em;
  cursor: pointer;
`;

const ImageBox = styled(Image)`
  width: 100%;
  padding: 0.5em;
`;

const Wrapper = styled(Container)`
  margin: 0 auto;
  max-width: 80%;
`;

class StudentSelect extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  async select(id) {
    const { studentId, setLoading } = this.props;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('student_id', studentId);
      formData.append('image_id', id);

      let result = await axios.post('/api/predict/faces/select', formData);

      if (result.data.success) {
        Router.push('/students/success');
      }
    } catch (err) {
      setLoading(false);
    }
  }

  render() {
    const { result } = this.props;
    const { select } = this;
    return (
      <Wrapper>
        <Title>Select Photo</Title>
        <Subtitle>Select your best photo</Subtitle>
        {result.map((res) => (
          <ImageWrapper key={res.id} onClick={() => select(res.id)}>
            <ImageBox src={res.url} />
          </ImageWrapper>
        ))}
        <CreditBox />
      </Wrapper>
    );
  }
}

export default StudentSelect;
