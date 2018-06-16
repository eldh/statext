import React from 'react'
import Picker from './components/Picker'
import Posts from './components/Posts'
import State from './state'
import { PostsFetcher } from './PostsFetcher'
import { css } from 'glamor'

export default function AsyncExample() {
  return (
    <div className={css({ paddingLeft: '20px', paddingRight: '20px' })}>
      <State>
        {({ subreddit, setSubreddit }) => (
          <Picker onChange={setSubreddit} options={['reactjs', 'frontend']} value={subreddit} />
        )}
      </State>
      <PostsFetcher>
        {({ posts, lastUpdated, refetch, isFetching, fallback }) => {
          const isEmpty = !isFetching && (!posts || posts.length === 0)

          return (
            <React.Fragment>
              <p>
                {lastUpdated && (
                  <span>
                    {'Last updated at '}
                    {new Date(lastUpdated).toLocaleTimeString()}
                    {'. '}
                  </span>
                )}
                {!isFetching && <button onClick={refetch}>{'Refresh'}</button>}
              </p>
              {isEmpty ? (
                fallback ? (
                  <h2>{'Loading...'}</h2>
                ) : (
                  <h2>{'Empty.'}</h2>
                )
              ) : (
                <div className={css({ opacity: isFetching ? 0.5 : 1 })}>{posts && <Posts posts={posts} />}</div>
              )}
            </React.Fragment>
          )
        }}
      </PostsFetcher>
    </div>
  )
}
