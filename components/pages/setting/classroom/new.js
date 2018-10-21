import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'

import Form from 'antd/lib/form'
import Container from '../../../commons/Container'
import Card from '../../../commons/Card'
import SelectInput from '../../../commons/SelectInput'
import TimeInput from '../../../commons/TimeInput'
import Button from '../../../commons/Button'
import CreditBox from '../../../commons/CreditBox'
import Title from '../../../commons/Title'
import Loader from '../../../commons/Loader'

const CreateButton = styled(Button)`
  background-color: #6d00ed;
  width: 100%;
  color: #fff;
  padding: 1.2em;
  font-size: 1.5em;
  font-weight: 300;
  outline: none;
  padding: 1em;
  cursor: pointer;

  :disabled {
    background-color: #aaa;
    cursor: default;
  }
`

const enhance = compose(
  withFormik({
    mapPropsToValues: () => { },
    validationSchema: Yup.object().shape({
      room: Yup.string().required('Room is required'),
      instructor: Yup.string().required('Instructor is required'),
      subject: Yup.string().required('Subject is required'),
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('Subject is required')
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      setSubmitting(true)
      await axios.post('/api/classroom/create', { ...values })
      setSubmitting(false)
    },
    displayName: 'ClassroomCreateForm'
  })
)

class CreateClassroom extends Component {
  constructor (props) {
    super(props)

    this.state = {
      result: {
        subjects: [],
        rooms: [],
        instructors: []
      },
      loading: false
    }

    this.fetch()

    this.fetch = this.fetch.bind(this)
  }

  async fetch () {
    let result = await axios.post('/api/classroom/form').then(r => r.data)

    result.instructors = result.instructors.map(instructor => ({
      ...instructor,
      value: `${instructor.firstname} ${instructor.lastname}`
    }))
    result.subjects = result.subjects.map(subject => ({ ...subject, value: subject.name }))
    result.rooms = result.rooms.map(room => ({ ...room, value: room.name }))

    this.setState({ result })
  }

  render () {
    const { values, touched, errors, isSubmitting, handleSubmit, setFieldValue, isValid } = this.props

    const {
      result: { rooms, instructors, subjects },
      loading
    } = this.state

    const keyEnterPress = e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }
    }

    return (
      <Fragment>
        {loading && <Loader />}
        <Container>
          <Card>
            <Title>Create Classroom</Title>
            <Form onKeyPress={e => keyEnterPress(e)}>
              <SelectInput
                onChange={setFieldValue}
                placeholder='Subject'
                name='subject'
                value={values.subject}
                error={errors.subject && touched.subject}
                message={errors.subject}
                label='Subject'
                size='large'
                options={subjects}
              />
              <SelectInput
                onChange={setFieldValue}
                placeholder='Room'
                name='room'
                value={values.room}
                error={errors.room && touched.room}
                message={errors.room}
                label='Room'
                size='large'
                options={rooms}
              />
              <SelectInput
                onChange={setFieldValue}
                placeholder='Instructor'
                name='instructor'
                value={values.instructor}
                error={errors.instructor && touched.instructor}
                message={errors.instructor}
                label='Instructor'
                size='large'
                options={instructors}
              />
              <TimeInput
                onChange={setFieldValue}
                placeholder='Start Time'
                name='startTime'
                value={values.startTime}
                error={errors.startTime && touched.startTime}
                message={errors.startTime}
                format={'HH:mm:ss'}
                label='Start Time'
                size='large'
                minuteStep={10}
                secondStep={30}
              />
              <TimeInput
                onChange={setFieldValue}
                placeholder='End Time'
                name='endTime'
                value={values.endTime}
                error={errors.endTime && touched.endTime}
                message={errors.endTime}
                format={'HH:mm:ss'}
                label='End Time'
                size='large'
                minuteStep={10}
                secondStep={30}
              />
              <CreateButton type='button' onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                Create
              </CreateButton>
            </Form>
            <CreditBox />
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default enhance(CreateClassroom)
