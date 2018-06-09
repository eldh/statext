import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Provider, Logger, TimeTravel } from 'statext'
import AppContainer from './containers/App'

class App extends Component {
  state = { mounted: true }
  render() {
    return (
      <React.StrictMode>
        <React.unstable_AsyncMode>
          <Provider>
            <Logger />
            <TimeTravel />
            <AppContainer />
          </Provider>
        </React.unstable_AsyncMode>
      </React.StrictMode>
    )
  }
}

export default App
