import React from 'react'
import Icon from './Icon'
import Spinner from './Spinner'
import './IndexPage.css'
import { AppSpinner } from '..'
import { MoviesLoader } from '../loaders'

function Score({ score, icon }) {
  if (score === null || score < 0) return null
  return (
    <React.Fragment>
      <Icon size="tiny" type={icon} /> {score}
      {'%'}
    </React.Fragment>
  )
}

function Movie({
  id,
  title,
  tomatoScore,
  tomatoIcon,
  popcornIcon,
  popcornScore,
  theaterReleaseDate,
  loading,
  onClick,
}) {
  return (
    <div
      className={`Movie box ${loading ? 'loading' : ''}`}
      onClick={() => onClick(id)}
      role="button"
      tabIndex="0"
    >
      <div className="content">
        <div className="title">
          {title} {id}
        </div>
        <div className="sub-text">
          <Score icon={tomatoIcon} score={tomatoScore} />
          {' · '}
          <Score icon={popcornIcon} score={popcornScore} />
          {' ·'} {theaterReleaseDate}
        </div>
      </div>
      {loading && <Spinner size="small" />}
    </div>
  )
}
export default function IndexPage({ onMovieClick, loadingMovieId }) {
  return (
    <MoviesLoader fallback={AppSpinner}>
      {({ value: movies }) => (
        <div className="IndexPage">
          <h1>{'Top Box Office'}</h1>
          <div>
            {movies.map(infos => (
              <Movie
                key={infos.id}
                {...infos}
                loading={infos.id === loadingMovieId}
                onClick={onMovieClick}
              />
            ))}
          </div>
        </div>
      )}
    </MoviesLoader>
  )
}
