import React from 'react'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'
import FilterState from '../states/FilterState'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  },
})

export default class FilterLink extends React.Component {
  render() {
    return (
      <FilterState>
        {({ dispatch, state }) => (
          <Link {...this.props} {...mapStateToProps(state, this.props)} {...mapDispatchToProps(dispatch, this.props)} />
        )}
      </FilterState>
    )
  }
}
