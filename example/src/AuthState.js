import React from 'react'
import PropTypes from 'prop-types'
import withSharedState from './statext/withSharedState'

class AuthState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }
  state = { authenticated: false }

  authenticate = () => {
    setTimeout(() => {
      this.setState(() => ({ authenticated: true }))
    }, 500)
  }

  render() {
    return this.props.children(this.state, { authenticate: this.authenticate })
  }
}

export default withSharedState(AuthState)
