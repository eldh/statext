import React from 'react'
import TodoTextInput from '../components/TodoTextInput'
import FilteredTodoState from '../states/FilteredTodoState'
import { addTodo } from '../actions'

const Header = () => (
  <FilteredTodoState>
    {({ dispatch }) => (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) {
              dispatch(addTodo(text))
            }
          }}
          placeholder="What needs to be done?"
        />
      </header>
    )}
  </FilteredTodoState>
)

export default Header
