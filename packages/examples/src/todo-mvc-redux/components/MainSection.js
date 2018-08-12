import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'

const MainSection = ({ todosCount, completedCount, actions }) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          checked={completedCount === todosCount}
          className="toggle-all"
          type="checkbox"
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <VisibleTodoList />
    {!!todosCount && (
      <Footer
        activeCount={todosCount - completedCount}
        completedCount={completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
)

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

export default MainSection
