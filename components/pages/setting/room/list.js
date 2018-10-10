import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'

class SubjectList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      rooms: []
    }

    this.getData()
    this.getData = this.getData.bind(this)
  }

  async getData () {
    let rooms = await axios.post('/api/room/all').then(r => r.data)

    this.setState({ rooms })
  }

  render () {
    const { rooms } = this.state

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
      <Table dataSource={rooms} columns={columns} rowKey={record => record.id} />
    )
  }
}

export default SubjectList
