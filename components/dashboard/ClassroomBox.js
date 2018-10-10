import React from 'react'
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import Box from '../commons/Box'
import Button from '../commons/Button'
import Link from 'next/link'

const ClassroomBox = styled(Box)`
  background-color: #ffffff;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  padding: 1em 2em;
  margin-bottom: 2em;
  color: #000;
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

const ConfigButton = styled(EnterButton)`
  background-color: #ffbb33;
  margin-left: 0.5em;

  :hover {
    background-color: #ff8800;
  }
`

export default ({ id, subject, room, time, setLoading, role }) => (
  <ClassroomBox>
    Subject : {subject}
    <br />
    Room : {room}
    <br />
    Time : {time}
    <br />
    {role === 'student' &&
    <Link href={`/students/classroom?id=${id}`} as={`/students/classroom/${id}`}>
      <EnterButton onClick={() => setLoading(true)}>
        <Icon type='login' /> Enter
      </EnterButton>
    </Link>}
    {['teacher', 'teaching assistant', 'admin'].includes(role) &&
    <Link href={`/classroom/overview?id=${id}`} as={`/classroom/${id}/overview`}>
      <EnterButton onClick={() => setLoading(true)}>
        <Icon type='login' /> Enter
      </EnterButton>
    </Link>}
    {role === 'admin' &&
    <ConfigButton>
      <Icon type='setting' /> Config
    </ConfigButton>}
  </ClassroomBox>
)
