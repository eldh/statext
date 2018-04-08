import React from 'react'
import PropTypes from 'prop-types'
import { withStatext } from './withSharedState'

class TimeTravel extends React.Component {
  static propTypes = {
    statext__: PropTypes.shape({
      store: PropTypes.object.isRequired,
      setStore: PropTypes.func.isRequired,
    }),
  }
  state = { past: this.props.statext__.store ? [this.props.statext__.store] : [], future: [] }

  static getDerivedStateFromProps({ statext__: { store } }, { past, future, iDidThis }) {
    if (store) return { past: [...past, store], iDidThis: false, future: iDidThis ? future : [] }
    return null
  }

  render() {
    return (
      <div>
        <button
          disabled={this.state.past.length < 2}
          onClick={() => {
            const previousStore = this.state.past[this.state.past.length - 2]
            previousStore &&
              this.setState(
                ({ past, future }) => {
                  const newpast = [...past]
                  const a = newpast.pop()
                  newpast.pop()
                  const newfuture = [a, ...future]
                  return { past: newpast, future: newfuture, iDidThis: true }
                },
                () => this.props.statext__.setStore(previousStore)
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
                return { future: newfuture, iDidThis: true }
              },
              () => this.props.statext__.setStore(nextStore)
            )
          }}
        >
          {'>'}
        </button>
      </div>
    )
  }
}

export default withStatext(TimeTravel)
