import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'

import Form from 'antd/lib/form'
import Container from '../../../commons/Container'
import Card from '../../../commons/Card'
import TextInput from '../../../commons/TextInput'
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
    mapPropsToValues: () => {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required')
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      setSubmitting(true)
      await axios.post('/api/subject/create', { ...values })
      setSubmitting(false)
    },
    displayName: 'SubjectCreateForm'
  })
)

class CreateSubject extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render () {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur,
      isValid
    } = this.props

    const { loading } = this.state

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
            <Title>Create Subject</Title>
            <Form onKeyPress={e => keyEnterPress(e)}>
              <TextInput
                icon='home'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Subject Name'
                name='name'
                value={values.name}
                error={errors.name && touched.name}
                message={errors.name}
                size='large'
                type='text'
                label='Subject Name'
              />
              <TextInput
                icon='edit'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Descripton'
                name='description'
                value={values.description}
                error={errors.description && touched.description}
                message={errors.description}
                size='large'
                type='text'
                label='Descripton'
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

export default enhance(CreateSubject)
