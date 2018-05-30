import React from 'react'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import CombinedState from '../states/CombinedState'

const mapStateToProps = state => ({
  todosCount: state.length,
  completedCount: getCompletedTodoCount(state),
})

export default function MainSectionContainer() {
  return (
    <CombinedState>
      {({ actions, state }) => <MainSection actions={actions} {...mapStateToProps(state)} />}
    </CombinedState>
  )
}
