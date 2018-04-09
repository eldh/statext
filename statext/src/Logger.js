import React from 'react'
import PropTypes from 'prop-types'
import { withStatext } from './withSharedState'

class Logger extends React.Component {
  static propTypes = {
    statext__: PropTypes.object.isRequired,
  }
  componentDidUpdate({ statext__: { store } }) {
    this.props.statext__.store.forEach((v, k) => {
      if (v !== store.get(k)) {
        // eslint-disable-next-line no-console
        console.log(k.name, store.get(k), v)
      }
    })
  }

  render() {
    return null
  }
}

export default withStatext(Logger)
