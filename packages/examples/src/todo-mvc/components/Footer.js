/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import FilterState from '../states/FilterState'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
}

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
  }

  renderTodoCount() {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} {'left'}
      </span>
    )
  }

  renderFilterLink(key, filter, setFilter) {
    const title = FILTER_TITLES[key]

    return (
      <a
        className={classnames({ selected: key === filter })}
        onClick={() => setFilter(key)}
        role="button"
        style={{ cursor: 'pointer' }}
        tabIndex={0}
      >
        {title}
      </a>
    )
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          {'Clear completed'}
        </button>
      )
    }
  }

  render() {
    return (
      <FilterState>
        {({ setFilter, filter }) => (
          <footer className="footer">
            {this.renderTodoCount()}
            <ul className="filters">
              {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(k => (
                <li key={k}>{this.renderFilterLink(k, filter, setFilter)}</li>
              ))}
            </ul>
            {this.renderClearButton()}
          </footer>
        )}
      </FilterState>
    )
  }
}
