import React from 'react';
import Icon from 'antd/lib/icon';
import Box from '../commons/Box';
import Button from '../commons/Button';
import Link from 'next/link';

const ClassroomBox = Box.extend`
  background-color: #ffffff;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  padding: 1em 2em;
  margin-bottom: 2em;
  color: #000;
`;

const EnterButton = Button.extend`
  margin-top: 0.7em;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.04);
  border: 0;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #00c851;
  outline: none;
  cursor: pointer;

  ${EnterButton}:hover {
    background-color: #007e33;
  }
`;

const ConfigButton = EnterButton.extend`
  background-color: #ffbb33;
  margin-left: 0.5em;

  ${ConfigButton}:hover {
    background-color: #ff8800;
  }
`;

export default ({ id, subject, room, time }) => (
  <ClassroomBox>
    Subject : {subject}
    <br />
    Room : {room}
    <br />
    Time : {time}
    <br />
    <Link href={`/classroom/detail?id=${id}`} as={`/classroom/detail/${id}`}>
      <EnterButton>
        <Icon type="login" /> Enter
      </EnterButton>
    </Link>
    <ConfigButton>
      <Icon type="setting" /> Config
    </ConfigButton>
  </ClassroomBox>
);
