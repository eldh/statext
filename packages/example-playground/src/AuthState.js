import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

class AuthState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }
  state = { authenticated: false }

  authenticate = () => {
    this.setState(
      new Promise(resolve => {
        setTimeout(() => resolve({ authenticated: true }), 2000)
      })
    )
  }

  render() {
    return this.props.children(this.state, { authenticate: this.authenticate })
  }
}

export default withSharedState(AuthState)
