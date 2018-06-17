import React from 'react'
import { Placeholder } from './placeholder'
import Spinner from './components/Spinner'
import IndexPage from './components/IndexPage'
import './components/App.css'
import MovieState from './MovieState'
import { MoviePageLoader } from './loaders'

export function AppSpinner() {
  return (
    <div className="AppSpinner">
      <Spinner size="large" />
    </div>
  )
}
function MoviePage(props) {
  return <MoviePageLoader fallback={AppSpinner}>{({ value: Component }) => <Component {...props} />}</MoviePageLoader>
}

export default function App() {
  return (
    <div className="Body">
      <div className="App">
        <MovieState>
          {({ selectMovie, state, showList }) => {
            const { showDetail, currentMovieId } = state
            return (
              <React.Fragment>
                {showDetail && (
                  <div className="back-link" onClick={showList} role="button" tabIndex="0">
                    {'➜'}
                  </div>
                )}
                <Placeholder delayMs={1500} fallback={AppSpinner}>
                  {showDetail ? (
                    <MoviePage movieId={currentMovieId} />
                  ) : (
                    <IndexPage loadingMovieId={currentMovieId} onMovieClick={selectMovie} />
                  )}
                </Placeholder>
              </React.Fragment>
            )
          }}
        </MovieState>
      </div>
    </div>
  )
}
