import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Container from '../commons/Container'
import CreditBox from '../commons/CreditBox'
import Card from '../commons/Card'
import Title from '../commons/Title'
import ClassroomBox from '../dashboard/ClassroomBox'
import Calendar from '../dashboard/Calendar'

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: 100%;
`

const DashboardCard = styled(Card)`
  display: grid;
  margin-top: 2em;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
`

const DashboardPage = ({ classrooms, setLoading }) => (
  <>
    <DashboardWrapper>
      <Container>
        <Title>Classrooms List</Title>
        <DashboardCard>
          {classrooms.map(classroom => {
            let start = new Date(
              classroom.classroom.startTime
            ).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
            let end = new Date(classroom.classroom.endTime).toLocaleTimeString(
              'en-US',
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }
            )
            let date = start + ' - ' + end
            return (
              <ClassroomBox
                key={classroom.classroom.id}
                id={classroom.classroom.id}
                subject={classroom.classroom.subject.name}
                room={classroom.classroom.room.name}
                time={date}
                setLoading={setLoading}
                role={classroom.role}
                live={classroom.classroom.live}
              />
            )
          })}
        </DashboardCard>
        <CreditBox />
      </Container>
      <Calendar />
    </DashboardWrapper>
  </>
)

DashboardPage.propTypes = {
  classrooms: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default DashboardPage
