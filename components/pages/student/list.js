import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'

class SubjectList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      students: []
    }

    this.getData()
    this.getData = this.getData.bind(this)
  }

  async getData () {
    let students = await axios.post('/api/student/all').then(r => r.data)

    students = students.map(student => ({ ...student, name: `${student.firstname} ${student.lastname}` }))

    this.setState({ students })
  }

  render () {
    const { students } = this.state

    const columns = [{
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId'
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }]

    return (
      <Table dataSource={students} columns={columns} rowKey={record => record.id} />
    )
  }
}

export default SubjectList
