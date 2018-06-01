export function bindActionsToDispatch(dispatch, actionCreators) {
  return Object.keys(actionCreators).reduce(
    (acc, key) => ({ ...acc, [key]: data => dispatch(actionCreators[key](data)) }),
    {}
  )
}
