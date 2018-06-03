import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'
import { combineReducers } from './combineReducers'

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function applyMiddleware(middlewares, getState, initialDispatch) {
  let dispatch = initialDispatch
  const middlewareAPI = {
    getState,
    dispatch: (...args2) => console.log("'dispatch', args2", 'dispatch', args2) || dispatch(...args2),
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(dispatch)

  return dispatch
}

export function createState(reducers, middlewares) {
  const reducer = combineReducers(reducers)
  class ReduxState extends React.Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
    }

    state = { state: reducer(undefined, {}) }

    getState = () => this.state.state

    commit = (action, cb) => {
      console.log('action, cb', action, cb)

      this.setState(({ state }) => ({ state: reducer(state, action) }), cb)
    }

    dispatch = applyMiddleware(middlewares, this.getState, this.commit)

    render() {
      return this.props.children({ state: this.state.state, dispatch: this.dispatch })
    }
  }
  return withSharedState(ReduxState)
}
