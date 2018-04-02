import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

function withContextConsumer(Compo) {
  return class WithContext extends React.Component {
    render() {
      return <Consumer>{context => <Compo {...this.props} __statext__={context} />}</Consumer>
    }
  }
}
function withSharedState_(Compo) {
  return class RestateComponent extends Compo {
    static propTypes = {
      __statext__: PropTypes.object.isRequired,
    }
    constructor(props) {
      super(props)

      if (!props.__statext__.state.store.get(Compo)) {
        props.__statext__.setState(this._state, null, Compo)
      }
    }

    shouldComponentUpdate({ __statext__, ...prevprops }, prevstate) {
      const { __statext__: _, ...props } = this.props
      if (!prevprops.__statext__ || __statext__.state.store !== prevprops.__statext__.state.store) return true
      for (const i in props) if (!(i in prevprops)) return true
      for (const i in prevprops) if (props[i] !== prevprops[i]) return true
      for (const i in this.state) if (!(i in prevstate)) return true
      for (const i in prevstate) if (this.state[i] !== prevstate[i]) return true
      return false
    }

    get state() {
      return this.props.__statext__.state.store.get(Compo) || this._state
    }
    set state(newState) {
      this._state = newState
    }

    setState = (nextState, cb) => {
      this.props.__statext__.setState(nextState, cb, Compo)
    }
  }
}

export default compo => withContextConsumer(withSharedState_(compo))
