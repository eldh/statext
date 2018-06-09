import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

class RedditState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = { subreddit: 'frontend' }

  setSubreddit = subreddit => this.setState(() => ({ subreddit }))

  render() {
    return this.props.children({ subreddit: this.state.subreddit, setSubreddit: this.setSubreddit })
  }
}

export default withSharedState(RedditState)
