import React from 'react'
import { Placeholder } from './future'
import Spinner from './components/Spinner'
import IndexPage from './components/IndexPage'
import './components/App.css'
import MovieState from './MovieState'
import { createLoader } from '../Loader'

export function AppSpinner() {
  return (
    <div className="AppSpinner">
      <Spinner size="large" />
    </div>
  )
}
const ComponentLoader = createLoader(() => import('./components/MoviePage').then(m => m.default || m))
function MoviePageLoader(props) {
  return <ComponentLoader fallback={AppSpinner}>{({ value: Component }) => <Component {...props} />}</ComponentLoader>
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
                <Placeholder delayMs={1500} fallback={<AppSpinner />}>
                  {showDetail ? (
                    <MoviePageLoader movieId={currentMovieId} />
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
