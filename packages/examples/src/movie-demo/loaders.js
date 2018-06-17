import { fetchMovieDetails, fetchMovieReviews, fetchMovies } from './api'
import { createLoader } from '../Loader'

export const MovieDetailsLoader = createLoader(fetchMovieDetails, movieId => movieId, 'MovieDetails')

export const MovieReviewsLoader = createLoader(fetchMovieReviews, movieId => movieId, 'MovieReviews')

export const MoviesLoader = createLoader(fetchMovies, 'FetchMovies')

export const ImageLoader = createLoader(
  src =>
    new Promise((resolve, reject) => {
      const image = new global.Image()
      image.onload = () => resolve(src)
      image.onerror = reject
      image.src = src
    }),
  src => src,
  'ImageLoader'
)

export const MoviePageLoader = createLoader(
  () => import('./components/MoviePage').then(m => m.default || m),
  'MoviePage'
)
