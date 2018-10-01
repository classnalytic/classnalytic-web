import Container from '../commons/Container';
import CreditBox from '../commons/CreditBox';
import Card from '../commons/Card';
import Title from '../commons/Title';
import Subtitle from '../commons/Subtitle';
import ClassroomBox from '../dashboard/ClassroomBox';

export default ({ classrooms, setLoading }) => (
  <Container>
    <Title>Classrooms List</Title>
    <Subtitle>Students are waiting for you</Subtitle>
    <Card>
      {classrooms.map((classroom) => {
        let start = new Date(classroom.classroom.startTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        let end = new Date(classroom.classroom.endTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        let date = start + ' - ' + end;
        return (
          <ClassroomBox
            key={classroom.classroom.id}
            id={classroom.classroom.id}
            subject={classroom.classroom.subject.name}
            room={classroom.classroom.room.name}
            time={date}
            setLoading={setLoading}
          />
        );
      })}
    </Card>
    <CreditBox />
  </Container>
);
