import React from 'react'
import PropTypes from 'prop-types'
import { Fetch } from '../Fetch'
import SearchState from './state/search'

export class PostsFetcher extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  render() {
    return (
      <SearchState>
        {({ query = 'car' }) => (
          <Fetch url={`https://source.unsplash.com/1600x900/?${query}`}>
            {({ json, ...rest }) => JSON.stringify({ json, ...rest })}
          </Fetch>
        )}
      </SearchState>
    )
  }
}
