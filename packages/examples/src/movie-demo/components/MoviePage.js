import React from 'react'
import Icon from './Icon'
import Spinner from './Spinner'
import './MoviePage.css'
import { MovieReviewsLoader, ImageLoader, MovieDetailsLoader } from '../loaders'

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
  return (
    <MovieReviewsLoader args={movieId} fallback={Spinner} timeout={500}>
      {({ value: reviews }) => (
        <div className="MovieReviews">
          {reviews.map(review => (
            <MovieReview key={review.id} {...review} />
          ))}
        </div>
      )}
    </MovieReviewsLoader>
  )
}

function Img(props) {
  return (
    <ImageLoader args={props.src}>
      {({ value: src }) => (
        <img alt={props.alt || props.src} {...props} src={src} />
      )}
    </ImageLoader>
  )
}

function MovieDetails({ movieId }) {
  return (
    <MovieDetailsLoader args={movieId}>
      {({ value: { ratingSummary, ratings, title, posters } }) => (
        <div className="MovieDetails">
          <div className="poster">
            <Img alt="poster" src={posters.detailed} />
          </div>
          <div className="details">
            <h1>{title}</h1>
            <div className="ratings">
              <Rating
                icon={ratings.critics_rating}
                label="Tomatometer"
                score={ratings.critics_score}
              />
              <Rating
                icon={ratings.audience_rating}
                label="Audience"
                score={ratings.audience_score}
              />
            </div>
            <div className="critic">
              <div className="small-title">{'Critics consensus'}</div>
              {ratingSummary.consensus}
            </div>
          </div>
        </div>
      )}
    </MovieDetailsLoader>
  )
}

export default function MoviePage({ movieId }) {
  return (
    <React.Fragment>
      <MovieDetails movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </React.Fragment>
  )
}
