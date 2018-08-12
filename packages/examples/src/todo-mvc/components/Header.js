import React, { Component } from 'react'
import TodoTextInput from './TodoTextInput'
import TodoState from '../states/TodoState'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>{'todos'}</h1>
        <TodoState>
          {({ addTodo }) => (
            <TodoTextInput
              newTodo
              onSave={addTodo}
              placeholder="What needs to be done?"
            />
          )}
        </TodoState>
      </header>
    )
  }
}
