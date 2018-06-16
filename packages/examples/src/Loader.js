import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

const cache = new Map()

class LoaderCache extends React.Component {
  static propTypes = {
    loadFn: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    refetchAt: PropTypes.number,
  }

  state = { cache }

  load = () => {
    const { loadFn, refetchAt } = this.props

    const lastUpdated = cache.get(loadFn) && cache.get(loadFn).lastUpdated
    const hasValue = !!lastUpdated
    const needsRefresh = refetchAt && hasValue && refetchAt > lastUpdated
    if (!needsRefresh && hasValue) {
      return cache.get(loadFn)
    }
    const pinkyPromise = loadFn(loadFn)
      .then(value => {
        cache.set(loadFn, { value, lastUpdated: Date.now() })
        this.setState({ cache })
      })
      .catch(error => {
        cache.set(loadFn, { error })
        this.setState({ cache })
      })
    cache.set(loadFn, pinkyPromise)
    throw pinkyPromise
  }

  render() {
    const { children } = this.props
    return children(this.load())
  }
}
const StatextLoaderCache = withSharedState(LoaderCache)

export function createLoader(loadFn) {
  return class Loader extends React.Component {
    static propTypes = {
      fallback: PropTypes.func.isRequired,
      children: PropTypes.func.isRequired,
      timeout: PropTypes.number,
      cacheKey: PropTypes.any,
    }

    static defaultProps = { timeout: 1500 }

    state = {
      refetchAt: null,
      loading: false,
      showLoader: true,
    }

    componentDidMount() {
      this.setFetching()
    }

    shouldComponentUpdate({ cacheKey, children }, nextState) {
      return this.state !== nextState || cacheKey !== this.props.cacheKey || this.props.children || children
    }

    setFetching = () => {
      this.setState({
        loading: true,
      })
    }

    refetch = () => {
      this.setState({ showLoader: true, loading: false })
      ReactDOM.unstable_deferredUpdates(() =>
        this.setState({
          loading: true,
          refetchAt: Date.now(),
        })
      )
    }

    render() {
      const { loading, showLoader, refetchAt } = this.state
      const { children, cacheKey, timeout, fallback: Fallback } = this.props

      return (
        <React.Timeout ms={timeout}>
          {didTimeout =>
            didTimeout ? (
              <Fallback />
            ) : loading || showLoader ? (
              <StatextLoaderCache cacheKey={cacheKey || loadFn} loadFn={loadFn} refetchAt={refetchAt}>
                {res =>
                  children({
                    ...res,
                    refetch: this.refetch,
                    showLoader: showLoader && !loading,
                  })
                }
              </StatextLoaderCache>
            ) : (
              children({
                refetch: this.refetch,
                loading: false,
                showLoader: false,
              })
            )
          }
        </React.Timeout>
      )
    }
  }
}
