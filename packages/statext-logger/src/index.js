import React from 'react'
import PropTypes from 'prop-types'
import { withStatext } from 'statext'

class Logger extends React.Component {
  static propTypes = {
    statext__: PropTypes.object.isRequired,
  }
  componentDidUpdate({ statext__: { store } }) {
    this.props.statext__.store.forEach((v, k) => {
      if (v !== store.get(k)) {
        /* eslint-disable no-console */
        console.group(k.displayName || k.name)
        console.log('From', store.get(k))
        console.log('To', v)
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
