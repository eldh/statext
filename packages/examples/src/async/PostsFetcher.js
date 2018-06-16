import React from 'react'
import PropTypes from 'prop-types'
import { Fetch } from '../Fetch'
import RedditState from './state'

export class PostsFetcher extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  render() {
    return (
      <RedditState>
        {({ subreddit }) => (
          <Fetch url={`https://www.reddit.com/r/${subreddit}.json`}>
            {({ json, ...rest }) =>
              this.props.children(
                json
                  ? {
                      posts: json.data.children.map(child => child.data),
                      ...rest,
                    }
                  : rest
              )
            }
          </Fetch>
        )}
      </RedditState>
    )
  }
}
