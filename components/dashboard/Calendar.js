import React from 'react'
import styled from 'styled-components'

import Title from '../commons/Title'

const CalendarTitle = styled(Title)`
  color: #fff;
  text-align: center;
  font-size: 2em;
  font-weight: 400;
`

const CalendarWrapper = styled.div`
  background-color: #1b1f7f;
  padding-top: 7em;
  height: 100vh;
`

const CalendarTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: #fff;
  text-align: center;
  margin: 1em 2em;

  div {
    padding: 0.5em;
  }
`

const Calendar = () => {
  let today = new Date(Date.now())
  let todayStr =
    today.getDate() +
    ' ' +
    today.toLocaleString('en-us', { month: 'long' }) +
    ' ' +
    today.getFullYear()

  let currentMonth = today

  currentMonth.setDate(1)

  let startDay = currentMonth.getDay()
  let numberDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate()

  let calendar = []

  for (let i = 0; i < startDay; i++) {
    calendar.push(<div key={i} />)
  }

  for (let i = 1; i <= numberDays; i++) {
    calendar.push(<div key={7 + i}>{i}</div>)
  }

  return (
    <CalendarWrapper>
      <CalendarTitle>{todayStr}</CalendarTitle>
      <CalendarTable>
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        {calendar}
      </CalendarTable>
    </CalendarWrapper>
  )
}

export default Calendar
