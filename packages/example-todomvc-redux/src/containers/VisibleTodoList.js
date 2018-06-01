import React from 'react'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import FilteredTodoState from '../states/FilteredTodoState'
import { bindActionsToDispatch } from 'statext-redux'
import * as actionCreators from '../actions'

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state),
})

const VisibleTodoList = () => (
  <FilteredTodoState>
    {({ dispatch, state }) => (
      <TodoList actions={bindActionsToDispatch(dispatch, actionCreators)} {...mapStateToProps(state)} />
    )}
  </FilteredTodoState>
)

export default VisibleTodoList
