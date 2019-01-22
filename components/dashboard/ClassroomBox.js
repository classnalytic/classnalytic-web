import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import Box from '../commons/Box'
import Button from '../commons/Button'
import Link from 'next/link'

const ClassroomBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* height: 300px; */
  background-color: #ffffff;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  padding: 1em 2em;
  color: #000;

  &::before {
    content: '';
    display: block;
    padding-top: 60%;
  }

  h1 {
    font-weight: 300;
    margin-bottom: 0em;
  }

  h2 {
    font-size: 1.2em;
    font-weight: 100;
  }
`

const LiveTag = styled.div`
  border-radius: 5px;
  background-color: #ff0000;
  color: #fff;
  position: absolute;
  padding: 0.5em;
  top: 1em;
  right: 1em;

  div {
    border-radius: 50%;
    width: 0.9em;
    height: 0.9em;
    background: #fff;
    display: inline-block;
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
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

const ClassroomContainer = ({
  id,
  subject,
  room,
  time,
  setLoading,
  role,
  live
}) => (
  <ClassroomBox>
    {live && (
      <LiveTag>
        <div /> Live
      </LiveTag>
    )}
    <div>
      <h1>{subject}</h1>
      <h2>
        {time} at {room}
      </h2>
    </div>
    <ButtonWrapper>
      {role === 'student' && (
        <Link
          href={`/students/classroom?id=${id}`}
          as={`/students/classroom/${id}`}
        >
          <EnterButton onClick={() => setLoading(true)}>
            <Icon type='login' /> Enter
          </EnterButton>
        </Link>
      )}
      {['teacher', 'teaching assistant', 'admin'].includes(role) && (
        <Link
          href={`/classroom/overview?id=${id}`}
          as={`/classroom/${id}/overview`}
        >
          <EnterButton onClick={() => setLoading(true)}>
            <Icon type='login' /> Enter
          </EnterButton>
        </Link>
      )}
      {role === 'admin' && (
        <Link
          href={`/setting/classroom/edit?id=${id}`}
          as={`/setting/classroom/${id}/edit`}
        >
          <ConfigButton>
            <Icon type='setting' /> Config
          </ConfigButton>
        </Link>
      )}
    </ButtonWrapper>
  </ClassroomBox>
)

ClassroomContainer.propTypes = {
  id: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired
}

export default ClassroomContainer
