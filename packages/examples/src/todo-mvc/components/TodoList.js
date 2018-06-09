/* eslint-disable react/prop-types */
import React from 'react'
import TodoItem from './TodoItem'
import FilterState from '../states/FilterState'

export function TodoList({ completeTodo, editTodo, removeTodo }) {
  return (
    <FilterState>
      {({ filteredTodos }) => (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              completeTodo={completeTodo}
              editTodo={editTodo}
              key={todo.id}
              removeTodo={removeTodo}
              todo={todo}
            />
          ))}
        </ul>
      )}
    </FilterState>
  )
}
