import React from 'react'
import { Provider, Logger, TimeTravel } from 'statext'
import AppContainer from './AppContainer'

// function isPromise(object) {
//   return Promise.resolve(object) === object
// }
// const thunk = (val, setState) => {
//   if (isPromise(val)) {
//     val.then(res => setState({ ...res, loading: false }))
//     return { loading: true }
//   }
//   return val
// }

class App extends React.Component {
  state = { mounted: true }
  render() {
    return (
      <React.unstable_AsyncMode>
        <Provider>
          <Logger />
          <TimeTravel />
          <AppContainer />
        </Provider>
      </React.unstable_AsyncMode>
    )
  }
}

export default App
