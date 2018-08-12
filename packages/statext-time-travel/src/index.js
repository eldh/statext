import React from 'react'
import PropTypes from 'prop-types'
import { withStatext } from 'statext'

const buttonStyle = {
  width: '30px',
  height: '30px',
  border: 0,
  backgroundColor: 'rgba(0,0,0,0.2)',
  color: '#fff',
  appearence: 'none',
  fontWeight: 900,
}

const wrapperStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  translateZ: 0,
  zIndex: 2000,
}

class TimeTravel extends React.Component {
  static propTypes = {
    statext__: PropTypes.shape({
      store: PropTypes.object.isRequired,
      setStore: PropTypes.func.isRequired,
    }),
  }
  state = {
    past: this.props.statext__.store ? [this.props.statext__.store] : [],
    future: [],
  }

  static getDerivedStateFromProps(
    {
      statext__: { store },
    },
    { past, future, iDidThis }
  ) {
    if (store && store !== past[past.length - 1])
      return {
        past: [...past, store],
        iDidThis: false,
        future: iDidThis ? future : [],
      }
    return null
  }

  render() {
    return (
      <div style={wrapperStyle}>
        <button
          disabled={this.state.past.length < 2}
          onClick={() => {
            const previousStore = this.state.past[this.state.past.length - 2]
            previousStore &&
              previousStore.size &&
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
          style={buttonStyle}
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
          style={buttonStyle}
        >
          {'>'}
        </button>
      </div>
    )
  }
}

export default withStatext(TimeTravel)
