/* global fetch */
import { createLoader } from './Loader'

export const Fetch = createLoader(
  url => fetch(url).then(body => body.json()),
  url => url
)
