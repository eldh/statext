import React from 'react'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import FilteredTodoState from '../states/FilteredTodoState'
import * as actionCreators from '../actions'
import { bindActionsToDispatch } from '../bindActionsToDispatch'

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state),
})

export default function MainSectionContainer() {
  return (
    <FilteredTodoState>
      {({ dispatch, state }) => (
        <MainSection actions={bindActionsToDispatch(dispatch, actionCreators)} {...mapStateToProps(state)} />
      )}
    </FilteredTodoState>
  )
}
