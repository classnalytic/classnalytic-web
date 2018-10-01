// Common Components
import Container from '../../commons/Container';
import CreditBox from '../../commons/CreditBox';
import Title from '../../commons/Title';
import Subtitle from '../../commons/Subtitle';

// Custom Components
import VideoBox from '../../student/NewVideoBox';

const StudentNew = ({ setResult, setLoading }) => {
  return (
    <Container>
      <Title>Add Student</Title>
      <Subtitle>New family member</Subtitle>
      <VideoBox setResult={setResult} setLoading={setLoading} />
      <CreditBox />
    </Container>
  );
};

export default StudentNew;
