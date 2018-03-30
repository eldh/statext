import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'

class StatexProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = { store: new Map() }
  _setState = (newStateInput, cb, comp) => {
    const newStateFn = prevState => {
      return {
        store: prevState.store.set(
          comp,
          typeof newStateInput === 'function' ? newStateInput(prevState.store.get(comp)) : newStateInput
        ),
      }
    }

    this.setState(newStateFn, cb)
  }
  render() {
    return <Provider value={{ state: this.state, setState: this._setState }}>{this.props.children}</Provider>
  }
}

export default StatexProvider
