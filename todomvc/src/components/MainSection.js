/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { TodoList } from './TodoList'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import TodoState from '../states/TodoState'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
}

function ToggleAll({ completedCount, todos, completeAll }) {
  return todos.length > 0 ? (
    <span>
      <input checked={completedCount === todos.length} className="toggle-all" type="checkbox" />
      <span onClick={completeAll} role="button" tabIndex={0} />
    </span>
  ) : null
}

function TodosFooter({ completedCount, todos, filter, clearCompleted, handleShow }) {
  const activeCount = todos.length - completedCount

  return todos.length > 0 ? (
    <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filter={filter}
      onClearCompleted={clearCompleted}
      onShow={handleShow}
    />
  ) : null
}

export default class MainSection extends Component {
  state = { filter: SHOW_ALL }

  handleShow = filter => {
    this.setState({ filter })
  }

  render() {
    const { filter } = this.state

    return (
      <TodoState>
        {({ todos, completeAll, completeTodo, clearCompleted, editTodo, removeTodo }) => {
          const filtered = todos.filter(TODO_FILTERS[filter])
          const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
          return (
            <section className="main">
              <ToggleAll completeAll={completeAll} completedCount={completedCount} todos={todos} />
              <TodoList completeTodo={completeTodo} editTodo={editTodo} removeTodo={removeTodo} todos={filtered} />
              <TodosFooter
                clearCompleted={clearCompleted}
                completedCount={completedCount}
                filter={filter}
                handleShow={this.handleShow}
                todos={todos}
              />
            </section>
          )
        }}
      </TodoState>
    )
  }
}
