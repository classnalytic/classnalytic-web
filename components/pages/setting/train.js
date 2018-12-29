import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Button from '../../commons/Button'

const TrainButton = styled(Button)`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #00c851;
  outline: none;
  cursor: pointer;

  :disabled {
    background-color: #aaa;
    cursor: default;
  }

  :hover {
    background-color: #007e33;
  }
`

const ReloadButton = styled(Button)`
  margin-top: 0.7em;
  margin-left: 0.5em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #ffbb33;
  outline: none;
  cursor: pointer;

  :disabled {
    background-color: #aaa;
    cursor: default;
  }

  :hover {
    background-color: #ff8800;
  }
`

class ModelTrain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      task: '',
      state: 'PENDING'
    }

    this.submitTrain = this.submitTrain.bind(this)
    this.statusTrain = this.statusTrain.bind(this)
    this.reloadModel = this.reloadModel.bind(this)
  }

  async submitTrain () {
    const { ready } = this.state

    if (ready) {
      let result = await axios.post('/api/predict/train').then(result => result.data)

      this.setState(result)
      this.setInterval()
    }
  }

  async statusTrain () {
    let result = await axios.post('/api/predict/train/status').then(result => result.data)

    this.setState(result)
  }

  async reloadModel () {
    const { ready } = this.state

    this.setState({ ready: false, state: 'RELOADING' })

    if (ready) {
      await axios.post('/api/predict/train/reload').then(result => result.data)
      this.statusTrain()
    }
  }

  setInterval () {
    this.interval = setInterval(() => {
      if (!this.state.ready) {
        this.statusTrain()
      } else {
        clearInterval(this.interval)
      }
    }, 1000)
  }

  componentDidMount () {
    this.statusTrain()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { ready, state } = this.state

    return (
      <Fragment>
        <TrainButton disabled={!ready} onClick={this.submitTrain}>Train</TrainButton>{' '}
        <ReloadButton disabled={!ready} onClick={this.reloadModel}>Reload</ReloadButton>
        <br /><br />
        Status : {state === 'RUNNING' && 'Training...'} {(state !== 'RUNNING' && state !== 'RELOADING') && 'Ready to work!'} {state === 'RELOADING' && 'Reloading Model!'}
      </Fragment>
    )
  }
}

export default ModelTrain
