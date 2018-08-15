import { createCombinedState } from 'statext-reducer'
import count from '../reducers/count'
import timer from '../reducers/timer'

export default createCombinedState({ count, timer })
