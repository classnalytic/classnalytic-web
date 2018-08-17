import Container from './commons/Container';
import Card from './commons/Card';
import TextInput from './commons/TextInput';
import Button from './commons/Button';
import CreditBox from './commons/CreditBox';

const LoginButton = Button.extend`
  padding: 1em;
`;

export default () => (
  <Container>
    <Card>
      <TextInput icon="user" placeholder="ชื่อผู้ใช้งาน" type="text" />
      <TextInput icon="lock" placeholder="รหัสผ่าน" type="password" />
      <LoginButton>เข้าสู่ระบบ</LoginButton>
      <CreditBox />
    </Card>
  </Container>
);
