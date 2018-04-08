import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

export function withStatext(Compo) {
  return class WithStatextContext extends React.Component {
    render() {
      return <Consumer>{context => <Compo {...this.props} statext__={context} />}</Consumer>
    }
  }
}
function withSharedState(Compo) {
  return class RestateComponent extends Compo {
    static propTypes = {
      statext__: PropTypes.object.isRequired,
    }
    constructor(props) {
      super(props)

      if (!props.statext__.store.get(Compo)) {
        props.statext__.setState(this._state, null, Compo)
      }
    }

    shouldComponentUpdate({ statext__: { store: prevStore }, ...prevprops }) {
      const { statext__: { store }, ...props } = this.props
      if (!prevStore || prevStore.get(Compo) !== store.get(Compo)) return true
      for (const i in props) if (!(i in prevprops)) return true
      for (const i in prevprops) if (props[i] !== prevprops[i]) return true
      return false
    }

    get state() {
      return this.props.statext__.store.get(Compo) || this._state
    }
    set state(newState) {
      this._state = newState
    }

    setState = (nextState, cb) => {
      this.props.statext__.setState(nextState, cb, Compo)
    }
  }
}

export default compo => withStatext(withSharedState(compo))
