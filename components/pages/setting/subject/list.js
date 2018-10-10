import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'

class SubjectList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      subjects: []
    }

    this.getData()
    this.getData = this.getData.bind(this)
  }

  async getData () {
    let subjects = await axios.post('/api/subject/all').then(r => r.data)

    this.setState({ subjects })
  }

  render () {
    const { subjects } = this.state

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }]

    return (
      <Table dataSource={subjects} columns={columns} rowKey={record => record.id} />
    )
  }
}

export default SubjectList
