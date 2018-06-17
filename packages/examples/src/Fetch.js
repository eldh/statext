import { createLoader } from './Loader'

export const Fetch = createLoader(url => window.fetch(url).then(body => body.json()), url => url)
