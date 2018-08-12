const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com'

async function responseAsDOM(response) {
  const text = await response.text()
  const parser = new global.DOMParser()
  return parser.parseFromString(text, 'text/html')
}

async function readBodyAndDecode(response) {
  const buffer = await response.arrayBuffer()

  const decoder = new global.TextDecoder('iso-8859-1')
  return decoder.decode(buffer)
}

async function scrapePage(pathIn) {
  const path = pathIn.startsWith('/') ? pathIn.slice(1) : pathIn
  const response = await global.fetch(
    `${CORS_PROXY_URL}/https://www.rottentomatoes.com/${path}`
  )
  return responseAsDOM(response)
}

export async function fetchMovies() {
  const document = await scrapePage('browse/in-theaters')
  for (const script of document.querySelectorAll('script')) {
    if (script.innerText.includes('loadPage')) {
      const movieListMatch = script.innerText.match(/^\s+(\[\{.*\}\]),$/m)
      if (movieListMatch) return JSON.parse(movieListMatch[1])
    }
  }
  throw new Error('Failed to fetch movies')
}

export async function fetchMovieDetails(id) {
  const response = await global.fetch(
    `https://www.rottentomatoes.com/api/private/v1.0/movies/${id}.json`
  )
  const text = await readBodyAndDecode(response)

  return JSON.parse(text)
}

export async function fetchMovieReviews(id) {
  const details = await fetchMovieDetails(id)

  // Simulate long delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  return details.reviews.reviews
}
