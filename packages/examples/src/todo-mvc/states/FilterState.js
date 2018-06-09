import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'
import TodoState from './TodoState'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
}

class FilterState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    filter: SHOW_ALL,
  }

  setFilter = filter => {
    this.setState({ filter })
  }

  filteredTodos = filter => {
    this.setState({ filter })
  }

  render() {
    return (
      <TodoState>
        {({ todos }) =>
          this.props.children({
            filter: this.state.filter,
            setFilter: this.setFilter,
            filteredTodos: todos.filter(TODO_FILTERS[this.state.filter]),
          })
        }
      </TodoState>
    )
  }
}

export default withSharedState(FilterState)
