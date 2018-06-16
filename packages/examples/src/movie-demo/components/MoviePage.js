import React from 'react'
import { fetchMovieDetails, fetchMovieReviews } from '../api'
import { createFetcher, Placeholder } from '../future'
import Icon from './Icon'
import Spinner from './Spinner'
import './MoviePage.css'

const movieDetailsFetcher = createFetcher(fetchMovieDetails)
const movieReviewsFetcher = createFetcher(fetchMovieReviews)

function Rating({ label, score, icon }) {
  if (typeof score !== 'number' || score < 0) return null
  return (
    <div className="Rating">
      <div className="small-title">{label}</div>
      {icon && (
        <div>
          <Icon size="medium" type={icon} />
        </div>
      )}
      <div className="rating-score">
        {score}
        {'%'}
      </div>
    </div>
  )
}

function MovieReview({ quote, critic }) {
  return (
    <div className="MovieReview box">
      <div>{quote}</div>
      <div className="sub-text">{critic.name}</div>
    </div>
  )
}

function MovieReviews({ movieId }) {
  const reviews = movieReviewsFetcher.read(movieId)
  return <div className="MovieReviews">{reviews.map(review => <MovieReview key={review.id} {...review} />)}</div>
}

const imageFetcher = createFetcher(
  src =>
    new Promise((resolve, reject) => {
      const image = new global.Image()
      image.onload = () => resolve(src)
      image.onerror = reject
      image.src = src
    })
)

function Img(props) {
  return <img alt={props.alt || props.src} {...props} src={imageFetcher.read(props.src)} />
}

function MovieDetails({ movieId }) {
  const { ratingSummary, ratings, title, posters } = movieDetailsFetcher.read(movieId)

  return (
    <div className="MovieDetails">
      <div className="poster">
        <Img alt="poster" src={posters.detailed} />
      </div>
      <div className="details">
        <h1>{title}</h1>
        <div className="ratings">
          <Rating icon={ratings.critics_rating} label="Tomatometer" score={ratings.critics_score} />
          <Rating icon={ratings.audience_rating} label="Audience" score={ratings.audience_score} />
        </div>
        <div className="critic">
          <div className="small-title">{'Critics consensus'}</div>
          {ratingSummary.consensus}
        </div>
      </div>
    </div>
  )
}

export default function MoviePage({ movieId }) {
  return (
    <React.Fragment>
      <MovieDetails movieId={movieId} />
      <Placeholder delayMs={500} fallback={<Spinner />}>
        <MovieReviews movieId={movieId} />
      </Placeholder>
    </React.Fragment>
  )
}
