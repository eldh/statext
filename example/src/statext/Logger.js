import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

class Logger extends React.Component {
  componentDidUpdate({ state: lastState }) {
    if (this.props.state !== lastState) {
      console.log('last, this', lastState, this.props.state)
    }
  }

  render() {
    return null
  }
}

class StatexLoggerWrapper extends React.Component {
  render() {
    return <Consumer>{({ state }) => <Logger state={state} />}</Consumer>
  }
}

export default StatexLoggerWrapper
