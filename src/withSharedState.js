import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

function withContextConsumer(Compo) {
  return class WithContext extends React.Component {
    render() {
      return <Consumer>{context => <Compo {...this.props} __context={context} />}</Consumer>
    }
  }
}
function withSharedState_(Compo) {
  return class RestateComponent extends Compo {
    static propTypes = {
      __context: PropTypes.object.isRequired,
    }
    constructor(props) {
      super(props)
      props.__context.setState(this._state, null, Compo)
    }
    get state() {
      return this.props.__context.state.store.get(Compo) || this._state
    }
    set state(newState) {
      this._state = newState
    }

    setState = (nextState, cb) => {
      this.props.__context.setState(nextState, cb, Compo)
    }
  }
}

export default compo => withContextConsumer(withSharedState_(compo))
