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
        /* eslint-disable no-console */
        console.group(k.name)
        console.log('From', v)
        console.log('To', store.get(k))
        console.groupEnd()
        /* eslint-enable no-console */
      }
    })
  }

  render() {
    return null
  }
}

export default withStatext(Logger)
