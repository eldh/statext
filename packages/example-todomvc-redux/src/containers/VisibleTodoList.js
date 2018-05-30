import React from 'react'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import CombinedState from '../states/CombinedState'

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state),
})

const VisibleTodoList = () => (
  <CombinedState>{({ actions, state }) => <TodoList actions={actions} {...mapStateToProps(state)} />}</CombinedState>
)

export default VisibleTodoList
