/* eslint-disable react/display-name */

import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

const cache = new Map()

function composeDispatch(d1, d2) {
  return function dispatch(...args) {
    d1(...args)
    d2(...args)
  }
}

function keyedReducerComponent([k, v]) {
  return [k, createState(v)]
}

function combineComponents(recuderComponentEntries) {
  return function Composed(props) {
    return recuderComponentEntries.reduceRight(
      (memo, [key, Component]) => (state1 = {}, dispatch1 = () => {}) => (
        <Component>
          {(state2, dispatch2) =>
            memo({ ...state1, [key]: state2 }, composeDispatch(dispatch1, dispatch2))
          }
        </Component>
      ),
      props.children
    )()
  }
}

export function createState(reducer) {
  if (cache.get(reducer)) {
    return cache.get(reducer)
  }
  class ReducerState extends React.Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
    }

    state = { state: reducer(undefined, {}) }

    dispatch = (action, cb) => {
      this.setState(({ state }) => ({ state: reducer(state, action) }), cb)
    }

    render() {
      return this.props.children(this.state.state, this.dispatch)
    }
  }
  const res = withSharedState(ReducerState)
  cache.set(reducer, res)
  return res
}

export function createCombinedState(reducers) {
  return combineComponents(Object.entries(reducers).map(keyedReducerComponent))
}
