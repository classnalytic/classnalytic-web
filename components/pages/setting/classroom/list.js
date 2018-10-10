import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'

class ClassroomList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      classrooms: []
    }

    this.getData()
    this.getData = this.getData.bind(this)
  }

  async getData () {
    let classrooms = await axios.post('/api/classroom/all').then(r => r.data)

    classrooms = classrooms.map(classroom => ({ ...classroom, roomName: classroom.room.name, subjectName: classroom.subject.name }))

    this.setState({ classrooms })
  }

  render () {
    const { classrooms } = this.state

    const columns = [{
      title: 'Subject',
      dataIndex: 'subjectName',
      key: 'subject'
    }, {
      title: 'Room',
      dataIndex: 'roomName',
      key: 'room'
    }]

    return (
      <Table dataSource={classrooms} columns={columns} rowKey={record => record.id} />
    )
  }
}

export default ClassroomList
