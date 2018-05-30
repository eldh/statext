import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from '../components/TodoTextInput'
import TodoState from '../states/TodoState'

const Header = () => (
  <TodoState>
    {({ actions: { addTodo } }) => (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) {
              addTodo(text)
            }
          }}
          placeholder="What needs to be done?"
        />
      </header>
    )}
  </TodoState>
)

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default Header
