import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

export function createState(reducer, name) {
  class ReducerState extends React.Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
    }

    state = { state: reducer(undefined, {}) }

    dispatch = actionCreator => data => this.setState(({ state }) => reducer(state, actionCreator(data)))

    render() {
      return this.props.children({ state: this.state.state, dispatch: this.dispatch, name })
    }
  }
  return withSharedState(ReducerState)
}
