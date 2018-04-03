import React from 'react'
import PropTypes from 'prop-types'
import withStore from './withStore'

class TimeTravel extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    setStore: PropTypes.func.isRequired,
  }
  state = { past: this.props.store ? [this.props.store] : [], future: [] }
  static getDerivedStateFromProps(props, { past }) {
    if (props.store) return { past: [...past, props.store] }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            const previousStore = this.state.past[this.state.past.length - 2]
            this.setState(
              ({ past, future }) => {
                const newpast = [...past]
                const a = newpast.pop()
                newpast.pop()
                const newfuture = [a, ...future]
                return { past: newpast, future: newfuture }
              },
              () => this.props.setStore(previousStore)
            )
          }}
        >
          {'<'}
        </button>
        <button
          disabled={this.state.future.length === 0}
          onClick={() => {
            let nextStore
            this.setState(
              ({ future }) => {
                const [next, ...newfuture] = future
                nextStore = next
                return { future: newfuture }
              },
              () => this.props.setStore(nextStore)
            )
          }}
        >
          {'>'}
        </button>
      </div>
    )
  }
}

export default withStore(TimeTravel)
