import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import State from '../state'
import { css } from 'glamor'

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit), () =>
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    )
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div className={css({ paddingLeft: '20px', paddingRight: '20px' })}>
        <Picker
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
          value={selectedSubreddit}
        />
        <p>
          {lastUpdated && (
            <span>
              {'Last updated at '}
              {new Date(lastUpdated).toLocaleTimeString()}
              {'. '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>{'Refresh'}</button>
          )}
        </p>
        {isEmpty ? (
          isFetching ? (
            <h2>{'Loading...'}</h2>
          ) : (
            <h2>{'Empty.'}</h2>
          )
        ) : (
          <div className={css({ opacity: isFetching ? 0.5 : 1 })}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  }
}

export default function Container() {
  return (
    <State>
      {({ state, dispatch }) => (
        <App {...mapStateToProps(state)} dispatch={dispatch} />
      )}
    </State>
  )
}
