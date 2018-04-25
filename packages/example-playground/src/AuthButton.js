import React from 'react'
import AuthState from './AuthState'

class AuthButton extends React.Component {
  render() {
    return (
      <AuthState>
        {(state, { authenticate }) => (
          <button disabled={state.authenticated} onClick={authenticate}>
            {state.authenticated ? "I'm in" : 'Authenticate me'}
          </button>
        )}
      </AuthState>
    )
  }
}

export default AuthButton
