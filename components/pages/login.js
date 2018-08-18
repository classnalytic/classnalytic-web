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
`;

export default () => (
  <Container>
    <Card>
      <Title>Login</Title>
      <TextInput icon="user" placeholder="Username" type="text" />
      <TextInput icon="lock" placeholder="Password" type="password" />
      <LoginButton>Login</LoginButton>
      <CreditBox />
    </Card>
  </Container>
);
