import styled from 'styled-components'

import Title from '../commons/Title'
import ActionListBox from './ActionListBox'

const ActionContainer = ActionListBox

const ActionTitle = styled(Title)`
  font-size: 2em;
  text-decoration: underline;
`

const ActionList = styled.ul`
  color: #222;
  font-size: 1.2em;
  list-style-type: circle;
  padding-left: 1.5em;
  margin: 0;
`

const ActionListChild = styled.li`
  font-weight: 300;
`

const ActionStatus = ({ actions }) => {
  return (
    <ActionContainer>
      <ActionTitle>Actions Logging</ActionTitle>
      <ActionList>
        {actions.map(action => {
          let time = new Date(action.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })

          return (
            <ActionListChild key={action.id}>
              {time} {action.action}
            </ActionListChild>
          )
        })}
      </ActionList>
    </ActionContainer>
  )
}

export default ActionStatus
