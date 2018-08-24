import { withFormik } from 'formik';
import * as Yup from 'yup';

import Container from '../commons/Container';
import Card from '../commons/Card';
import TextInput from '../commons/TextInput';
import Button from '../commons/Button';
import CreditBox from '../commons/CreditBox';
import Title from '../commons/Title';

const LoginButton = Button.extend`
  background-color: #6d00ed;
  width: 100%;
  color: #fff;
  padding: 1.2em;
  font-size: 1.5em;
  font-weight: 300;
  outline: none;
  padding: 1em;
  cursor: pointer;

  ${LoginButton}:disabled {
    background-color: #aaa;
    cursor: default;
  }
`;

const formikEnhancer = withFormik({
  mapPropsToValues: ({ store }) => ({ ...store }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .required('Username is required!'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required!')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'LoginForm'
});

const LoginPage = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isValid
  } = props;
  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <TextInput
          icon="user"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Username"
          name="username"
          value={values.username}
          error={errors.username && touched.username}
          message={errors.username}
          type="text"
        />
        <TextInput
          icon="lock"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors.password && touched.password}
          message={errors.password}
          type="password"
        />
        <LoginButton disabled={!isValid || isSubmitting}>Login</LoginButton>
        <CreditBox />
      </Card>
    </Container>
  );
};

export default formikEnhancer(LoginPage);
