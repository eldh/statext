import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Provider, Logger, TimeTravel } from 'statext'
import AppContainer from './AppContainer'

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
      <React.StrictMode>
        <React.unstable_AsyncMode>
          <Provider middleware={[thunk]}>
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
