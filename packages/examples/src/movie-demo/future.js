import { default as React, Timeout } from 'react'
import { createResource, createCache } from 'simple-cache-provider'

const cache = createCache(() => {})

export function createFetcher(resolver) {
  const resource = createResource(resolver)
  return {
    read: key => resource.read(cache, key),
  }
}

export function Placeholder({ delayMs, children, fallback }) {
  return <Timeout ms={delayMs}>{didExpire => (didExpire ? fallback : children)}</Timeout>
}
