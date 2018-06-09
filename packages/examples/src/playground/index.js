import React, { Component } from 'react'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import AuthButton from './AuthButton'
import AuthInfo from './AuthInfo'
import Async from './Async'
import { withSharedState, Logger, TimeTravel } from 'statext'
import AsyncState from './AsyncState'
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

class App extends Component {
  state = { mounted: true }
  render() {
    return (
      <div>
        <Logger />
        <TimeTravel />
        <button onClick={() => this.setState(s => ({ mounted: !s.mounted }))}>{'Toggle unmount'}</button>
        {this.state.mounted && (
          <div className={css({ ' & *': { display: 'flex', flexDirection: 'column' } })}>
            <h2>{'AsyncState'}</h2>
            <Async />
            <AsyncState>
              {({ data, loading, fallback }) =>
                data
                  ? 'Async data: ' + data
                  : fallback
                    ? 'Async data is taking too long'
                    : loading
                      ? 'Async data is loading'
                      : 'Push the button to fetch data'
              }
            </AsyncState>
            <hr />
            <h2>{'AuthState'}</h2>
            <AuthInfo />
            <AuthButton />
            <hr />
            <h2>{'CountState'}</h2>
            <CountState render={({ count }) => `The count is ${count}`} />
            <CountState
              render={({ count }, { increaseCount }) => <button onClick={increaseCount}>{'Click me ' + count}</button>}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App
