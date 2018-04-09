import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  render() {
    const { todo, completeTodo, editTodo, removeTodo } = this.props
    const handleSave = (id, text) => {
      if (text.length === 0) {
        removeTodo(id)
      } else {
        editTodo({ id, text })
      }
      this.setState({ editing: false })
    }

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput editing={this.state.editing} onSave={text => handleSave(todo.id, text)} text={todo.text} />
      )
    } else {
      element = (
        <div className="view">
          <input
            checked={todo.completed}
            className="toggle"
            id={'input' + todo.id}
            onChange={() => completeTodo(todo.id)}
            type="checkbox"
          />
          <label htmlFor={'input' + todo.id} onDoubleClick={this.handleDoubleClick} role="button" tabIndex={0}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => removeTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing,
        })}
      >
        {element}
      </li>
    )
  }
}
