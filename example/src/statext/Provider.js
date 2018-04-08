import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'

class StatexProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      store: new Map(),
      setState: (newStateInput, cb, comp) => {
        this.setState(({ store: oldStore }) => {
          const newStore = new Map(oldStore)
          const oldVal = newStore.get(comp)
          const val = typeof newStateInput === 'function' ? newStateInput(oldVal) : newStateInput
          newStore.set(comp, { ...oldVal, ...val })
          return { store: newStore }
        }, cb)
      },
      setStore: (store, cb) => {
        this.setState(() => ({ store }), cb)
      },
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export default StatexProvider
