import { Fragment } from 'react'
import styled from 'styled-components'

import { withFormik } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'

import Form from 'antd/lib/form'
import Container from '../commons/Container'
import Card from '../commons/Card'
import TextInput from '../commons/TextInput'
import Button from '../commons/Button'
import CreditBox from '../commons/CreditBox'
import Title from '../commons/Title'
import Loader from '../commons/Loader'

const LoginButton = styled(Button)`
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
      username: Yup.string().min(4, 'Username must be at least 4 characters').required('Username is required!'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!')
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
      props.setLoading(true)
      props.doLogin(values.username, values.password)
      setSubmitting(false)
    },
    displayName: 'LoginForm'
  })
)

const LoginPage = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    user: { loading }
  } = props

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
          <Title>Login</Title>
          <Form onKeyPress={e => keyEnterPress(e)}>
            <TextInput
              icon='user'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Username'
              name='username'
              value={values.username}
              error={errors.username && touched.username}
              message={errors.username}
              type='text'
            />
            <TextInput
              icon='lock'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Password'
              name='password'
              value={values.password}
              error={errors.password && touched.password}
              message={errors.password}
              type='password'
            />
            <LoginButton type='button' onClick={handleSubmit} disabled={!isValid || isSubmitting}>
              Login
            </LoginButton>
          </Form>
          <CreditBox />
        </Card>
      </Container>
    </Fragment>
  )
}

export default enhance(LoginPage)
