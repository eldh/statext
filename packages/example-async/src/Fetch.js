import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const cache = new Map()
const load = (url, refetchAt) => {
  const hasValue = cache.get(url) && !!cache.get(url).lastUpdated
  const needsRefresh = refetchAt && hasValue && refetchAt > cache.get(url).lastUpdated
  if (!needsRefresh && hasValue) {
    return cache.get(url)
  }
  const pinkyPromise = window
    .fetch(url)
    .then(body => body.json())
    .then(json => cache.set(url, { json, lastUpdated: Date.now() }))
    .catch(error => cache.set(url, { error }))
  cache.set(url, pinkyPromise)
  throw pinkyPromise
}

function AsyncFetcher({ url, refetchAt, children }) {
  return children(load(url, refetchAt))
}

export class Fetch extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    timeout: PropTypes.number,
  }

  static defaultProps = { timeout: 500 }

  constructor(props) {
    super(props)
    this.state = cache.has(props.url)
      ? {
          refetchAt: null,
          shouldFetch: true,
          isFetching: false,
        }
      : {
          refetchAt: null,
          shouldFetch: false,
          isFetching: true,
        }
  }

  componentDidMount() {
    this.setFetching()
  }

  componentDidUpdate({ url }) {
    if (this.props.url !== url) {
      this.setFetching()
    }
  }

  setFetching = forceRefetch => {
    if (forceRefetch || !cache.has(this.props.url)) {
      this.setState({ isFetching: true, shouldFetch: false })
      ReactDOM.unstable_deferredUpdates(() =>
        this.setState({
          shouldFetch: true,
          refetchAt: Date.now(),
        })
      )
    } else {
      this.setState({
        shouldFetch: true,
      })
    }
  }

  refetch = () => {
    this.setFetching(true)
  }

  render() {
    const { shouldFetch, isFetching, refetchAt } = this.state
    const { children, url, timeout } = this.props

    return (
      <React.Timeout key={url} ms={timeout}>
        {didTimeout =>
          didTimeout ? (
            children({
              fallback: true,
              refetch: this.refetch,
              isFetching: false,
            })
          ) : shouldFetch || isFetching ? (
            <AsyncFetcher refetchAt={refetchAt} url={url}>
              {res =>
                children({
                  ...res,
                  fallback: false,
                  refetch: this.refetch,
                  isFetching: isFetching && !shouldFetch,
                })
              }
            </AsyncFetcher>
          ) : (
            children({
              refetch: this.refetch,
              fallback: false,
              shouldFetch,
              isFetching,
            })
          )
        }
      </React.Timeout>
    )
  }
}
