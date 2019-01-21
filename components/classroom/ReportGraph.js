import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { VictoryPie, VictoryTooltip } from 'victory'

const NoDataBox = styled.div`
  padding: 8em;
  font-size: 1.2em;
`

const ReportGraph = ({ emotions }) => {
  const colors = [
    '#0088fe',
    '#937af3',
    '#cf69d9',
    '#f65cb5',
    '#ff5b8d',
    '#ff6966',
    '#ff8042'
  ]

  return (
    <Fragment>
      {emotions.every(e => e.y === 0) ? (
        <NoDataBox>
          No Data
          <br />
        </NoDataBox>
      ) : (
        <VictoryPie
          colorScale={colors}
          data={emotions}
          labelRadius={90}
          labelComponent={<VictoryTooltip />}
          sortKey='y'
          labels={d => (d.y === 0 ? '' : `${d.x}: ${d.y.toFixed(2)}%`)}
          style={{
            parent: { maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' },
            labels: { fontSize: 14 }
          }}
          animate={{
            duration: 500
          }}
        />
      )}
      Emotion Report
    </Fragment>
  )
}

ReportGraph.propTypes = {
  emotions: PropTypes.array.isRequired
}

export default ReportGraph
