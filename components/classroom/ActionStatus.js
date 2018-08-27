import styled from 'styled-components';

import Title from '../commons/Title';

const ActionContainer = styled.div``;

const ActionTitle = Title.extend`
  font-size: 2em;
  text-decoration: underline;
`;

const ActionList = styled.ul`
  color: #222;
  font-size: 1.2em;
  list-style-type: circle;
  padding-left: 1.5em;
  margin: 0;
`;

const ActionListChild = styled.li`
  font-weight: 300;
`;

const ActionStatus = () => {
  return (
    <ActionContainer>
      <ActionTitle>Actions Logging</ActionTitle>
      <ActionList>
        <ActionListChild>10:21 AM Hand up</ActionListChild>
      </ActionList>
    </ActionContainer>
  );
};

export default ActionStatus;
