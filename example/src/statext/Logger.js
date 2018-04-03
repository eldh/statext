import React from 'react'
import PropTypes from 'prop-types'
import withStore from './withStore'

class Logger extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  componentDidUpdate({ store }) {
    this.props.store.forEach((v, k) => {
      if (v !== store.get(k)) {
        console.log('last, this', store.get(k), v)
      }
    })
  }

  render() {
    return null
  }
}

export default withStore(Logger)
