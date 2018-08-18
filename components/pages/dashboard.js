import Container from '../commons/Container';
import CreditBox from '../commons/CreditBox';
import Card from '../commons/Card';
import Title from '../commons/Title';
import Subtitle from '../commons/Subtitle';
import ClassroomBox from '../dashboard/ClassroomBox';

export default () => (
  <Container>
    <Title>Classrooms List</Title>
    <Subtitle>Students are waiting for you</Subtitle>
    <Card>
      <ClassroomBox subject="Information Technology Fundemantal" room="Auditorium" time="9:00 AM - 11:00 AM" />
      <ClassroomBox subject="Information Technology Fundemantal" room="Auditorium" time="9:00 AM - 11:00 AM" />
      <ClassroomBox subject="Information Technology Fundemantal" room="Auditorium" time="9:00 AM - 11:00 AM" />
      <ClassroomBox subject="Information Technology Fundemantal" room="Auditorium" time="9:00 AM - 11:00 AM" />
    </Card>
    <CreditBox />
  </Container>
);
