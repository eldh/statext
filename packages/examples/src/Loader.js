import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'
import { Placeholder } from './movie-demo/placeholder'

export function createLoader(loadFn, getCacheKey, name) {
  const ongoing = {}

  const displayName = name || (typeof getCacheKey === 'string' ? getCacheKey : 'LoaderCache')

  class LoaderCache extends React.Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
      args: PropTypes.any,
      refetchAt: PropTypes.number,
    }

    static displayName = displayName

    state = {}

    load = () => {
      const { refetchAt, args } = this.props
      const key = typeof getCacheKey === 'function' ? getCacheKey(args) : getCacheKey

      const lastUpdated = this.state[key] && this.state[key].lastUpdated
      const hasValue = !!lastUpdated
      const needsRefresh = refetchAt && hasValue && refetchAt > lastUpdated
      if (!needsRefresh && hasValue) {
        return this.state[key]
      }

      const pinkyPromise =
        ongoing[key] ||
        loadFn(...(Array.isArray(args) ? args : [args]))
          .then(value => {
            this.unstable_deferredSetState({ [key]: { value, lastUpdated: Date.now() } })
            delete ongoing[key]
          })
          .catch(error => {
            this.unstable_deferredSetState({ [key]: { error } })
            delete ongoing[key]
          })
      ongoing[key] = pinkyPromise
      throw pinkyPromise
    }

    render() {
      const { children } = this.props
      return children(this.load())
    }
  }

  const StatextCache = withSharedState(LoaderCache)

  return class Loader extends React.Component {
    static propTypes = {
      fallback: PropTypes.func,
      children: PropTypes.func.isRequired,
      timeout: PropTypes.number,
      args: PropTypes.any,
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

    renderChildren() {
      const { loading, showLoader, refetchAt } = this.state
      const { children, args } = this.props
      return loading || showLoader ? (
        <StatextCache args={args} getCacheKey={getCacheKey} loadFn={loadFn} refetchAt={refetchAt}>
          {res =>
            children({
              ...res,
              refetch: this.refetch,
              showLoader: showLoader && !loading,
            })
          }
        </StatextCache>
      ) : (
        children({
          refetch: this.refetch,
          loading: false,
          showLoader: false,
        })
      )
    }

    render() {
      const { timeout, fallback: Fallback } = this.props

      return Fallback ? (
        <Placeholder delayMs={timeout} fallback={Fallback}>
          {this.renderChildren()}
        </Placeholder>
      ) : (
        this.renderChildren()
      )
    }
  }
}
