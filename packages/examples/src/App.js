import React from 'react'
import { Provider } from 'statext'
// import { Logger } from 'statext-logger'
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

export default class App extends React.Component {
  state = { mounted: true }
  render() {
    return (
      <React.unstable_AsyncMode>
        <Provider>
          {/* <Logger /> */}
          {/* 
        <TimeTravel /> */}
          <AppContainer />
        </Provider>
      </React.unstable_AsyncMode>
    )
  }
}
