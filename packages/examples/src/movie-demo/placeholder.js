import React from 'react'

export function Placeholder({ delayMs, children, fallback: Fallback }) {
  return (
    <React.Timeout ms={delayMs}>
      {didExpire => (didExpire ? <Fallback /> : children)}
    </React.Timeout>
  )
}
