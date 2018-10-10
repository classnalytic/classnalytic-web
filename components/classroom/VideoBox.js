import React, { Component } from 'react'
import styled from 'styled-components'

import dataURLtoFile from '../../utils/dataURLtoFile'
import capitalize from '../../utils/capitalize'
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

const WebcamWrapper = styled.div`
`

const BoundingBox = styled.div`
  position: absolute;
  width: ${props => props.right - props.left}px;
  height: ${props => props.bottom - props.top}px;
  margin-left: ${props => props.left}px;
  margin-top: ${props => props.top}px;
  border: 6px solid blue;
  color: yellow;
  font-size: 10px;
`

const videoConstraints = {
  width: 1280,
  height: 720
}

class Video extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: '',
      predict: []
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
    this.setState({ predict: result })
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
    const { predict } = this.state
    return (
      <VideoBox>
        <InfoTitle>Video</InfoTitle>
        <WebcamWrapper>
          {predict.map(r => <BoundingBox key={r.name} left={r.face_location[0]} top={r.face_location[1]} right={r.face_location[2]} bottom={r.face_location[3]}>
            {r.name} - {capitalize(Object.keys(r.emotions).reduce((a, b) => (r.emotions[a] > r.emotions[b] ? a : b)))}
          </BoundingBox>)}
          <Webcam
            videoConstraints={videoConstraints}
            screenshotFormat='image/jpeg'
            ref={this.setRef}
            onUserMedia={this.ready}
            width='100%'
            height='auto'
            audio={false}
          />
        </WebcamWrapper>
      </VideoBox>
    )
  }
}

export default Video
