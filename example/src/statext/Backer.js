import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './context'

class Logger extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    setStore: PropTypes.func.isRequired,
  }
  state = { stores: this.props.store ? [this.props.store] : [] }
  static getDerivedStateFromProps(props, { stores }) {
    if (props.store) return { stores: [...stores, props.store] }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            const previousStore = this.state.stores[this.state.stores.length - 2]
            this.setState(
              ({ stores }) => {
                const newStores = [...stores]
                newStores.pop()
                newStores.pop()
                return { stores: newStores }
              },
              () => this.props.setStore(previousStore)
            )
          }}
        >
          {'<'}
        </button>
      </div>
    )
  }
}

class StatexBackerWrapper extends React.Component {
  render() {
    return <Consumer>{({ state: { store }, ...rest }) => <Logger {...rest} store={store} />}</Consumer>
  }
}

export default StatexBackerWrapper
