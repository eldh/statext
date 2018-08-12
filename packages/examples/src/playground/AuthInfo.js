import React from 'react'
import AuthState from './AuthState'
import { css } from 'glamor'

class AuthInfo extends React.Component {
  render() {
    return (
      <AuthState>
        {({ loading, authenticated }) => (
          <div
            className={css({
              padding: '10px',
              color: loading ? 'orange' : authenticated ? 'green' : 'red',
            })}
          >
            {loading
              ? 'Authenticating...'
              : authenticated
                ? 'Authenticated'
                : 'Not authenticated'}
          </div>
        )}
      </AuthState>
    )
  }
}

export default AuthInfo
