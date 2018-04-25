import React from 'react'
import AsyncState from './AsyncState'

export default class Async extends React.Component {
  render() {
    return (
      <AsyncState>
        {({ fallback, loading, data, requestData }) => (
          <React.Fragment>
            {loading && <p>{'Requested content:'}</p>}
            {fallback && <span>{'The content is still loading :('}</span>}
            {data && <div>{data}</div>}
            <button onClick={requestData}>{data ? 'clear data' : 'load data'}</button>
          </React.Fragment>
        )}
      </AsyncState>
    )
  }
}
