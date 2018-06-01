import reducer from '../reducers/todos'
import { createState } from 'statext-redux'

export default createState(reducer, 'todos')
