import React from 'react'
import PropTypes from 'prop-types'

// Common Components
import Container from '../../commons/Container'
import CreditBox from '../../commons/CreditBox'
import Title from '../../commons/Title'
import Subtitle from '../../commons/Subtitle'

// Custom Components
import VideoBox from '../../student/NewVideoBox'

const StudentNew = ({ setResult, setLoading, setStudentId }) => {
  return (
    <Container>
      <Title>Train Student</Title>
      <Subtitle>New family member</Subtitle>
      <VideoBox
        setResult={setResult}
        setLoading={setLoading}
        setStudentId={setStudentId}
      />
      <CreditBox />
    </Container>
  )
}

StudentNew.propTypes = {
  setResult: PropTypes.func,
  setLoading: PropTypes.func,
  setStudentId: PropTypes.func
}

export default StudentNew
