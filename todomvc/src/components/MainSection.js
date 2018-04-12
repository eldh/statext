/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { TodoList } from './TodoList'
import Footer from './Footer'
import TodoState from '../states/TodoState'

function ToggleAll({ completedCount, todos, completeAll }) {
  return todos.length > 0 ? (
    <span>
      <input checked={completedCount === todos.length} className="toggle-all" type="checkbox" />
      <span onClick={completeAll} role="button" tabIndex={0} />
    </span>
  ) : null
}

function TodosFooter({ completedCount, todos, filter, clearCompleted }) {
  const activeCount = todos.length - completedCount

  return todos.length > 0 ? (
    <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filter={filter}
      onClearCompleted={clearCompleted}
    />
  ) : null
}

export default class MainSection extends Component {
  render() {
    return (
      <TodoState>
        {({ todos, completeAll, completeTodo, clearCompleted, editTodo, removeTodo }) => {
          const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
          return (
            <section className="main">
              <ToggleAll completeAll={completeAll} completedCount={completedCount} todos={todos} />
              <TodoList completeTodo={completeTodo} editTodo={editTodo} removeTodo={removeTodo} />
              <TodosFooter clearCompleted={clearCompleted} completedCount={completedCount} todos={todos} />
            </section>
          )
        }}
      </TodoState>
    )
  }
}
