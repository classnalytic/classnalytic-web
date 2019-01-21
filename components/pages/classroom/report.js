import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import DatePicker from 'antd/lib/date-picker/'
import styled from 'styled-components'
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
import ReportGraph from '../../classroom/ReportGraph'

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
  color: #000;
  margin-bottom: 2em;
  padding: 1em;
  text-align: center;
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

class ClassroomReport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: moment(),
      id: this.props.classroom.id,
      report: {
        emotions: [],
        attendances: [],
        actions: []
      }
    }

    this.getReport(moment())

    this.onDateChange = this.onDateChange.bind(this)
    this.getReport = this.getReport.bind(this)
  }

  onDateChange (date, dateString) {
    this.setState({ date })
    if (dateString !== '') {
      this.getReport(date)
    }
  }

  async getReport (date) {
    const { id } = this.state
    let report = await axios
      .post(`/api/classroom/${id}/report`, { date: date.format('YYYY-MM-DD') })
      .then(res => res.data)
    report.emotions = Object.keys(report.emotions).map(i => ({
      x: Capitalize(i, true),
      y: parseFloat(report.emotions[i])
    }))
    this.setState({ report })
  }

  render () {
    const { classroom } = this.props
    const {
      date,
      report: { emotions, attendances }
    } = this.state
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

    let actions = classroom.actions

    return (
      <Container>
        <Title>Classroom Report</Title>
        <Subtitle>{subjectName}</Subtitle>
        <br />
        <Row gutter={16}>
          <Col span={16}>
            <ReportBox>
              <InfoTitle>Report</InfoTitle>
              Date :{' '}
              <DatePicker
                value={date}
                onChange={this.onDateChange}
                disabledDate={date => moment(date).isAfter(moment())}
              />
              <ReportGraph emotions={emotions} />
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
              <Link
                href={`/classroom/detail?id=${id}`}
                as={`/classroom/${id}/detail`}
              >
                <EnterButton>
                  <Icon type='login' /> Start Classroom
                </EnterButton>
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
}

export default ClassroomReport
