import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'

class StatexProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = { store: new Map() }
  _setState = (newStateInput, cb, comp) => {
    this.setState(({ store: oldStore }) => {
      const newStore = new Map(oldStore)
      const oldVal = newStore.get(comp)
      const val = typeof newStateInput === 'function' ? newStateInput(oldVal) : newStateInput
      newStore.set(comp, { ...oldVal, ...val })
      return { store: newStore }
    }, cb)
  }
  _setStore = (store, cb) => {
    this.setState(() => ({ store: new Map(store) }), cb)
  }
  render() {
    return (
      <Provider value={{ state: this.state, setState: this._setState, setStore: this._setStore }}>
        {this.props.children}
      </Provider>
    )
  }
}

export default StatexProvider
