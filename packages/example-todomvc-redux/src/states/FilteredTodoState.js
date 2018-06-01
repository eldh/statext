import TodoState from '../states/TodoState'
import FilterState from '../states/FilterState'
import { combineStates } from 'statext-redux'

export default combineStates(FilterState, TodoState)
