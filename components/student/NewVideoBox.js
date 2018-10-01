import React, { Component } from 'react';
import styled from 'styled-components';

import dataURLtoFile from '../../utils/dataURLtoFile';
import Webcam from 'react-webcam';
import axios from 'axios';

import TextInput from '../commons/TextInput';
import Button from '../commons/Button';

const VideoBox = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  background-color: #6d00ed;
  width: 30%;
  color: #fff;
  padding: 1.2em;
  font-size: 1.5em;
  font-weight: 300;
  outline: none;
  padding: 1em;
  cursor: pointer;

  ${SubmitButton}:disabled {
    background-color: #aaa;
    cursor: default;
  }
`;

const videoConstraints = {
  width: 1280,
  height: 720
};

class Video extends Component {
  state = {
    id: '',
    image: '',
    ready: false
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    let image = this.webcam.getScreenshot();
    this.setState({ image });
  };

  post = async () => {
    const formData = new FormData();

    let file = dataURLtoFile(this.state.image);

    formData.append('image', file, file.name);
    formData.append('student_id', String(this.state.id).trim());

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    let result = await axios.post('/api/predict/faces/register', formData, config).then((result) => result.data);

    if (!Array.isArray(result)) result = [];
    if (result.length == 0) result = [];

    this.props.setResult(result);
  };

  async submit() {
    await this.capture();
    this.props.setLoading(true);
    await this.post();
    this.props.setLoading(false);
  }

  ready = () => {
    this.setState({ ready: true });
  };

  handleChange(value) {
    this.setState({ id: value });
  }

  render() {
    return (
      <VideoBox>
        <Webcam
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          ref={this.setRef}
          onUserMedia={this.ready}
          width={'100%'}
          audio={false}
        />
        <TextInput
          icon="lock"
          onChange={(e) => this.handleChange(e.target.value)}
          placeholder="Student ID"
          name="text"
          value={this.state.id}
          style={{ width: '50%', marginTop: '2em' }}
        />

        <SubmitButton type="submit" onClick={this.submit} disabled={String(this.state.id).trim() === ''}>
          Add
        </SubmitButton>
      </VideoBox>
    );
  }
}

export default Video;
