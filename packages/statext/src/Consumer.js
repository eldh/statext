import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

class RestateConsumer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Consumer>
        {({ state, setState }) => this.props.children(state, setState)}
      </Consumer>
    )
  }
}

export default RestateConsumer
