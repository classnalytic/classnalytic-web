import { Row, Col } from 'antd'
import styled from 'styled-components'

// import Webcam from 'react-webcam';

import Container from '../../commons/Container'
import CreditBox from '../../commons/CreditBox'
import Title from '../../commons/Title'
import Subtitle from '../../commons/Subtitle'

import EmotionStatus from '../../classroom/EmotionStatus'
import ActionStatus from '../../classroom/ActionStatus'
import VideoBox from '../../classroom/VideoBox'
import InfoBox from '../../classroom/InfoBox'
import NameListBox from '../../classroom/NameListBox'

const InfoTitle = styled(Title)`
  font-size: 2em;
  text-decoration: underline;
`

const StudentTitle = styled(Title)`
  font-size: 2em;
  text-decoration: underline;
`

const StudentChecked = styled(Subtitle)`
  color: #000;
  font-size: 1em;
  margin-top: 1em;
`

const InfoList = styled.ul`
  color: #222;
  font-size: 1.2em;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const LightText = styled.b`
  font-weight: 300;
`

const StudentList = styled.ul`
  color: #222;
  font-size: 1.2em;
  list-style-type: circle;
  padding-left: 1.5em;
  margin: 0;
`

const InfoListChild = styled.li``

const StudentListChild = styled.li`
  font-weight: 300;
`

const ClassroomDetail = ({ classroom }) => {
  let subjectName = classroom.subject.name
  let roomName = classroom.room.name

  let startTime = new Date(classroom.startTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  let endTime = new Date(classroom.endTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  let time = startTime + ' - ' + endTime

  let attendances = classroom.attendances
  let actions = classroom.actions
  let emotions = classroom.emotions

  return (
    <Container>
      <Title>Classroom Panel</Title>
      <Subtitle>See your students though your eyes</Subtitle>
      <br />
      <Row gutter={16}>
        <Col span={16}>
          <VideoBox id={classroom.id} />
          <EmotionStatus emotions={emotions} />
        </Col>
        <Col span={8}>
          <InfoBox>
            <InfoTitle>Info</InfoTitle>
            <InfoList>
              <InfoListChild>
                Subject : <LightText>{subjectName}</LightText>
              </InfoListChild>
              <InfoListChild>
                Room : <LightText>{roomName}</LightText>
              </InfoListChild>
              <InfoListChild>
                Time : <LightText>{time}</LightText>
              </InfoListChild>
            </InfoList>
          </InfoBox>
          <InfoBox>
            <StudentTitle>Students</StudentTitle>
            <NameListBox>
              <StudentList>
                {attendances.map(attendance => {
                  let user = attendance.user
                  return (
                    <StudentListChild key={attendance.id}>
                      {user.firstname} {user.lastname}
                    </StudentListChild>
                  )
                })}
              </StudentList>
            </NameListBox>
            <StudentChecked>{attendances.length} Student(s)</StudentChecked>
          </InfoBox>
          <InfoBox>
            <ActionStatus actions={actions} />
          </InfoBox>
        </Col>
      </Row>
      <CreditBox />
    </Container>
  )
}

export default ClassroomDetail
