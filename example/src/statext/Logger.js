import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

class Logger extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  componentDidUpdate({ store }) {
    this.props.store.forEach((v, k) => {
      if (v !== store.get(k)) {
        console.log('last, this', store.get(k), v)
      }
    })
  }

  render() {
    return null
  }
}

class StatexLoggerWrapper extends React.Component {
  render() {
    return <Consumer>{({ state: { store }, ...rest }) => <Logger {...rest} store={store} />}</Consumer>
  }
}

export default StatexLoggerWrapper
