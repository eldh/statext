import reducers from '../reducers'
import { createState } from 'statext-redux'

const thunk = ({ dispatch, getState }) => next => (action, ...rest) => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action, ...rest)
}

export default createState(reducers, [thunk])
