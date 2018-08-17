import Container from '../commons/Container';
import Card from '../commons/Card';
import TextInput from '../commons/TextInput';
import Button from '../commons/Button';
import CreditBox from '../commons/CreditBox';
import Title from '../commons/Title';

const LoginButton = Button.extend`
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
