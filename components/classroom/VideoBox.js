import React, { Component } from 'react'
import styled from 'styled-components'

import dataURLtoFile from '../../utils/dataURLtoFile'
import Webcam from 'react-webcam'
import axios from 'axios'

import Title from '../commons/Title'

const VideoBox = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  text-align: center;
`

const InfoTitle = styled(Title)`
  font-size: 2em;
  text-decoration: underline;
`

const videoConstraints = {
  width: 1280,
  height: 720
}

class Video extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }

    this.setRef = this.setRef.bind(this)
    this.capture = this.capture.bind(this)
    this.ready = this.ready.bind(this)
    this.post = this.post.bind(this)
  }

  setRef (webcam) {
    this.webcam = webcam
  }

  capture () {
    let image = this.webcam.getScreenshot()
    this.setState({ image })
  }

  async post () {
    const formData = new FormData()
    let file = dataURLtoFile(this.state.image)
    formData.append('image', file, file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    let result = await axios.post('/api/predict', formData, config).then(result => result.data)
    if (result.length !== 0) {
      axios.post('/api/classroom/save', { data: JSON.stringify(result), id: this.props.id })
    }
  }

  ready () {
    this.interval = setInterval(() => {
      this.capture()
      this.post()
    }, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <VideoBox>
        <InfoTitle>Video</InfoTitle>
        <Webcam
          videoConstraints={videoConstraints}
          screenshotFormat='image/jpeg'
          ref={this.setRef}
          onUserMedia={this.ready}
          width={'100%'}
          audio={false}
        />
      </VideoBox>
    )
  }
}

export default Video
