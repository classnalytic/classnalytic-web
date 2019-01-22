import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

// import Loader from '../../../components/commons/Loader'
import Protected from '../../../components/commons/Protected'

import { checkLogin } from '../../../redux/user'

import EditClassroom from '../../../components/pages/setting/classroom/edit'

class SettingClassroomPage extends Component {
  static async getInitialProps ({ store, query }) {
    return { ...store, query }
  }

  render () {
    const {
      query: { id }
    } = this.props

    return (
      <Fragment>
        {/* {loading && <Loader />} */}
        <Helmet
          htmlAttributes={{ lang: 'th' }}
          title='Classnalytic | Edit Classroom'
          meta={[
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
            },
            { property: 'og:title', content: 'Classnalytic' }
          ]}
        />
        <Protected>
          <EditClassroom id={id} />
        </Protected>
      </Fragment>
    )
  }
}

export default connect(
  state => state,
  { checkLogin }
)(SettingClassroomPage)
