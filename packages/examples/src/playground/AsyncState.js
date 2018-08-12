import React from 'react'
import PropTypes from 'prop-types'
import { createResource, createCache } from 'simple-cache-provider'
import { withSharedState } from 'statext'

const cache = createCache()
const { read: readText } = createResource(
  ([text, ms = 0]) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(text)
      }, ms)
    })
  },
  ([text]) => text
)

function AsyncLoader({ text = 'Hello async rendering', ms = 2500, children }) {
  return children(readText(cache, [text, ms]))
}

class AsyncState extends React.Component {
  static propTypes = { children: PropTypes.func.isRequired }
  state = {
    showHello: false,
    loading: false,
  }

  requestData = () => {
    if (this.state.loading) {
      this.setState({ loading: false, loadData: false })
    } else {
      this.setState({ loading: true })
      this.unstable_deferredSetState({ loadData: true })
    }
  }

  render() {
    const { loadData, loading } = this.state
    const { children } = this.props
    return loadData ? (
      <React.Timeout ms={500}>
        {didTimeout =>
          didTimeout ? (
            children({ fallback: true, loading, requestData: this.requestData })
          ) : (
            <AsyncLoader>
              {data =>
                children({ data, loading, requestData: this.requestData })
              }
            </AsyncLoader>
          )
        }
      </React.Timeout>
    ) : (
      children({ loading, requestData: this.requestData })
    )
  }
}
export default withSharedState(AsyncState)
