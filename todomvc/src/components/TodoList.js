/* eslint-disable react/prop-types */
import React from 'react'
import TodoItem from './TodoItem'

export function TodoList({ todos, completeTodo, editTodo, removeTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem completeTodo={completeTodo} editTodo={editTodo} key={todo.id} removeTodo={removeTodo} todo={todo} />
      ))}
    </ul>
  )
}
