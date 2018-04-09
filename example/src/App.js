import React, { Component } from 'react'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import AuthButton from './AuthButton'
import AuthInfo from './AuthInfo'
import { withSharedState, Provider, Logger, TimeTravel } from 'statext'
const CountState = withSharedState(
  class CountState extends React.Component {
    static propTypes = {
      render: PropTypes.func,
    }

    state = {
      count: 0,
      foo: 'bar',
    }

    increaseCount = () => {
      this.setState(s => ({
        count: s.count + 1,
      }))
    }

    render() {
      return this.props.render(this.state, { increaseCount: this.increaseCount })
    }
  }
)

function isPromise(object) {
  return Promise.resolve(object) === object
}
const thunk = (val, setState) => {
  if (isPromise(val)) {
    val.then(res => setState({ ...res, loading: false }))
    return { loading: true }
  }
  return val
}

class App extends Component {
  state = { mounted: true }
  render() {
    return (
      <Provider middleware={[thunk]}>
        <Logger />
        <TimeTravel />
        <button onClick={() => this.setState(s => ({ mounted: !s.mounted }))}>{'Toggle unmount'}</button>
        {this.state.mounted && (
          <div className={css({ ' & *': { display: 'flex', flexDirection: 'column' } })}>
            <AuthInfo />
            <AuthButton />
            <CountState render={({ count }) => `The count is ${count}`} />
            <CountState
              render={({ count }, { increaseCount }) => <button onClick={increaseCount}>{'Click me ' + count}</button>}
            />
          </div>
        )}
      </Provider>
    )
  }
}

export default App
