import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

class TodoState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    todos: [{ id: 0, text: 'Finish statext', completed: false }],
  }

  addTodo = text => {
    if (text.length !== 0) {
      this.setState(({ todos }) => ({
        todos: [
          {
            text,
            id: todos.length > 0 ? todos[0].id + 1 : 0,
            completed: false,
          },
          ...todos,
        ],
      }))
    }
  }

  removeTodo = removeId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== removeId),
    }))
  }

  completeTodo = completeId => {
    this.setState(({ todos }) => ({
      todos: todos.map(
        todo =>
          todo.id === completeId
            ? { ...todo, completed: !todo.completed }
            : todo
      ),
    }))
  }

  editTodo = edited => {
    this.setState(({ todos }) => ({
      todos: todos.map(
        todo => (todo.id === edited.id ? { ...todo, ...edited } : todo)
      ),
    }))
  }

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ completed }) => !completed),
    }))
  }

  completeAll = () => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => ({ ...todo, completed: true })),
    }))
  }

  render() {
    return this.props.children({
      removeTodo: this.removeTodo,
      completeTodo: this.completeTodo,
      editTodo: this.editTodo,
      completeAll: this.completeAll,
      clearCompleted: this.clearCompleted,
      addTodo: this.addTodo,
      todos: this.state.todos,
    })
  }
}

export default withSharedState(TodoState)
