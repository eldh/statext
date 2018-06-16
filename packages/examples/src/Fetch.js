// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import { withSharedState } from 'statext'
import { createLoader } from './Loader'

export const Fetch = createLoader(innerUrl => window.fetch(innerUrl).then(body => body.json()))

// class Fetcher extends React.Component {
//   static propTypes = {
//     url: PropTypes.string.isRequired,
//     children: PropTypes.func.isRequired,
//     refetchAt: PropTypes.number,
//   }
//   state = { cache: new Map() }

//   load = (url, refetchAt) => {
//     const { cache } = this.state
//     const hasValue = cache.get(url) && !!cache.get(url).lastUpdated
//     const needsRefresh = refetchAt && hasValue && refetchAt > cache.get(url).lastUpdated
//     if (!needsRefresh && hasValue) {
//       return cache.get(url)
//     }
//     const pinkyPromise = window
//       .fetch(url)
//       .then(body => body.json())
//       .then(json => {
//         cache.set(url, { json, lastUpdated: Date.now() })
//         this.setState({ cache })
//       })
//       .catch(error => {
//         cache.set(url, { error })
//         this.setState({ cache })
//       })
//     cache.set(url, pinkyPromise)
//     this.setState({ cache })
//     throw pinkyPromise
//   }

//   render() {
//     const { url, refetchAt, children } = this.props
//     return children(this.load(url, refetchAt))
//   }
// }
// const StatextFetcher = withSharedState(Fetcher)

// export class Fetch extends React.Component {
//   static propTypes = {
//     url: PropTypes.string.isRequired,
//     children: PropTypes.func.isRequired,
//     timeout: PropTypes.number,
//   }

//   static defaultProps = { timeout: 500 }

//   constructor(props) {
//     super(props)
//     this.state = {
//       refetchAt: null,
//       shouldFetch: false,
//       isFetching: true,
//     }
//   }

//   componentDidMount() {
//     this.setFetching()
//   }

//   componentDidUpdate({ url }) {
//     if (this.props.url !== url) {
//       this.setFetching()
//     }
//   }

//   setFetching = forceRefetch => {
//     if (forceRefetch) {
//       this.setState({ isFetching: true, shouldFetch: false })
//       ReactDOM.unstable_deferredUpdates(() =>
//         this.setState({
//           shouldFetch: true,
//           refetchAt: Date.now(),
//         })
//       )
//     } else {
//       this.setState({
//         shouldFetch: true,
//       })
//     }
//   }

//   refetch = () => {
//     this.setFetching(true)
//   }

//   render() {
//     const { shouldFetch, isFetching, refetchAt } = this.state
//     const { children, url, timeout } = this.props

//     return (
//       <React.Timeout ms={timeout}>
//         {didTimeout =>
//           didTimeout ? (
//             children({
//               fallback: true,
//               refetch: this.refetch,
//               isFetching: false,
//             })
//           ) : shouldFetch || isFetching ? (
//             <StatextFetcher refetchAt={refetchAt} url={url}>
//               {res =>
//                 children({
//                   ...res,
//                   fallback: false,
//                   refetch: this.refetch,
//                   isFetching: isFetching && !shouldFetch,
//                 })
//               }
//             </StatextFetcher>
//           ) : (
//             children({
//               refetch: this.refetch,
//               fallback: false,
//               shouldFetch,
//               isFetching,
//             })
//           )
//         }
//       </React.Timeout>
//     )
//   }
// }
