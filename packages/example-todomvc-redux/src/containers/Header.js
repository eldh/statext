import React from 'react'
import TodoTextInput from '../components/TodoTextInput'
import TodoState from '../states/TodoState'
import { addTodo } from '../actions'

const Header = () => (
  <TodoState>
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
  </TodoState>
)

export default Header
