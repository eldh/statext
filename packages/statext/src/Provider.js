import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'

const compose = (fns, extra) =>
  fns.reduce(
    (prevFn, nextFn) => value => nextFn(prevFn(value, extra), extra),
    value => value
  )
class StatextProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    middleware: PropTypes.arrayOf(PropTypes.func.isRequired),
  }
  static defaultProps = { middleware: [] }
  constructor(props) {
    super(props)
    function getStateSetter(wrapper = a => a()) {
      return function unboundSetState(newStateInput, cb, comp) {
        wrapper(() =>
          this.setState(({ store: oldStore }) => {
            const newStore = new Map(oldStore)
            const oldVal = newStore.get(comp) || {}
            const val =
              typeof newStateInput === 'function'
                ? newStateInput(oldVal)
                : newStateInput
            const valAfterMiddleware = compose(
              props.middleware,
              (newVal, newCb = cb) => setState(newVal, newCb, comp)
            )(val)
            newStore.set(comp, { ...oldVal, ...valAfterMiddleware })
            return { store: newStore }
          }, cb)
        )
      }
    }
    const setState = getStateSetter().bind(this)
    this.state = {
      store: new Map(),
      setState,
      setStore: (store, cb) => {
        this.setState(() => ({ store }), cb)
      },
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export default StatextProvider
