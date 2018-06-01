import TodoState from '../states/TodoState'
import FilterState from '../states/FilterState'
import { combineStates } from '../combineStates'

export default combineStates(FilterState, TodoState)
