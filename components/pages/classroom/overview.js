import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import { VictoryPie } from 'victory'
import Link from 'next/link'

import Capitalize from '../../../utils/capitalize'

import Container from '../../commons/Container'
import CreditBox from '../../commons/CreditBox'
import Title from '../../commons/Title'
import Button from '../../commons/Button'
import Subtitle from '../../commons/Subtitle'

import ActionStatus from '../../classroom/ActionStatus'
import InfoBox from '../../classroom/InfoBox'
import NameListBox from '../../classroom/NameListBox'

// Customize Component
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

const ReportBox = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  text-align: center;
`

const NoDataBox = styled.div`
  padding: 8em;
  font-size: 1.2em;
`

const EnterButton = styled(Button)`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #00c851;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #007e33;
  }
`

const ReportButton = styled(Button)`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #5bc0de;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #31b0d5;
  }
`

const ClassroomDetail = ({ classroom }) => {
  let id = classroom.id
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

  emotions = Object.keys(emotions).map(i => ({ x: Capitalize(i, true), y: parseFloat(emotions[i]) }))

  const colors = ['#0088fe', '#937af3', '#cf69d9', '#f65cb5', '#ff5b8d', '#ff6966', '#ff8042']

  return (
    <Container>
      <Title>Classroom Overview</Title>
      <Subtitle>See your students though your eyes</Subtitle>
      <br />
      <Row gutter={16}>
        <Col span={16}>
          <ReportBox>
            <InfoTitle>Latest Report</InfoTitle>
            {emotions.every((e) => e.y === 0) ? <NoDataBox>No Data<br /></NoDataBox>
              : <VictoryPie
                colorScale={colors}
                data={emotions}
                sortKey='y'
                labels={(d) => d.y === 0 ? '' : `${d.x}: ${d.y}%`}
                style={{ parent: { maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }, labels: { fontSize: 14 } }}
              />}
            Emotion Report
          </ReportBox>
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
            <Link href={`/classroom/detail?id=${id}`} as={`/classroom/${id}/detail`}>
              <EnterButton><Icon type='login' /> Start Classroom</EnterButton>
            </Link>{' '}
            <Link href={`/classroom/report?id=${id}`} as={`/classroom/${id}/report`}>
              <ReportButton><Icon type='info' /> View Report</ReportButton>
            </Link>
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
