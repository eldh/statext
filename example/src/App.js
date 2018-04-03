import React, { Component } from 'react'
import Provider from './statext/Provider'
import Logger from './statext/Logger'
import TimeTravel from './statext/TimeTravel'
import AuthButton from './AuthButton'
import AuthInfo from './AuthInfo'
import withSharedState from './statext/withSharedState'
class CountState_ extends React.Component {
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
const CountState = withSharedState(CountState_)

class App extends Component {
  state = { mounted: true }
  render() {
    return (
      <Provider>
        <Logger />
        <TimeTravel />
        <button onClick={() => this.setState(s => ({ mounted: !s.mounted }))}>{'Toggle unmount'}</button>
        {this.state.mounted && (
          <div>
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
