import React from 'react'
import { withSharedState } from 'statext'

class MovieState extends React.Component {
  state = {
    currentMovieId: null,
    showDetail: false,
  }

  handleMovieClick = movieId => {
    this.setState({ currentMovieId: movieId })
    this.unstable_deferredSetState({ showDetail: true })
  }

  handleBackClick = () => {
    this.unstable_deferredSetState({ currentMovieId: null, showDetail: false })
  }

  render() {
    return this.props.children({
      state: this.state,
      selectMovie: this.handleMovieClick,
      showList: this.handleBackClick,
    })
  }
}
export default withSharedState(MovieState)
