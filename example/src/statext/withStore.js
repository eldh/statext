import React from 'react'
import { Consumer } from './context'

export default function withStore(Compo) {
  return class WithStore extends React.Component {
    render() {
      return <Consumer>{({ state: { store }, ...rest }) => <Compo {...rest} store={store} />}</Consumer>
    }
  }
}
