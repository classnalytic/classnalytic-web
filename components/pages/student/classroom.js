import React, { Component } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Table from 'antd/lib/table'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'

import Container from '../../commons/Container'
import CreditBox from '../../commons/CreditBox'
import Title from '../../commons/Title'
import Subtitle from '../../commons/Subtitle'

import InfoBox from '../../classroom/InfoBox'

// Customize Component
const InfoTitle = styled(Title)`
  font-size: 2em;
  text-decoration: underline;
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

const InfoListChild = styled.li``

const ReportBox = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  text-align: center;
`

class StudentClassroomDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      attendances: []
    }

    this.getData = this.getData.bind(this)
  }

  async getData (id) {
    let attendances = await axios.post('/api/student/classroom', { classroomId: id }).then(r => r.data)

    this.setState({ attendances })
  }

  componentDidMount () {
    this.getData(this.props.classroom.id)
  }

  render () {
    const { classroom } = this.props
    let { attendances } = this.state
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

    attendances = attendances.map(attendance => {
      let date = moment(attendance.time).utcOffset('+07:00').format('YYYY-MM-DD')
      let time = moment(attendance.time).utcOffset('+07:00').format('hh:mm:ss A')

      let hour = moment(classroom.startTime).get('hour')
      let minute = moment(classroom.startTime).get('minute')

      let late = moment(attendance.time).hour(hour).minute(minute).second(0).millisecond(0).add(15, 'minutes').isBefore(attendance.time)

      return {
        date, time, late: late ? 'Late' : 'On-Time'
      }
    })

    const columns = [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }, {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    }, {
      title: 'Status',
      dataIndex: 'late',
      key: 'status'
    }]

    return (
      <Container>
        <Title>Classroom Attendance</Title>
        <Subtitle>See your students though your eyes</Subtitle>
        <br />
        <Row gutter={16}>
          <Col span={16}>
            <ReportBox>
              <InfoTitle>Attendance Records</InfoTitle>
              <Table dataSource={attendances} columns={columns} rowKey={record => record.date} />
            </ReportBox>
          </Col>
          <Col span={8}>
            <InfoBox>
              <InfoTitle>Classroom Info</InfoTitle>
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
          </Col>
        </Row>
        <CreditBox />
      </Container>
    )
  }
}

export default StudentClassroomDetail
