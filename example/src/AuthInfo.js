import React from 'react'
// import PropTypes from 'prop-types'
import AuthState from './AuthState'

class AuthInfo extends React.Component {
  render() {
    return <AuthState>{state => JSON.stringify(state)}</AuthState>
  }
}

export default AuthInfo
