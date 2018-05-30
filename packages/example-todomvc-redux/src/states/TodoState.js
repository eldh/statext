import reducer from '../reducers/todos'
import { createState } from '../createState'

export default createState(reducer, 'todos')
