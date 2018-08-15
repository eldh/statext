import React from 'react'
import State from './state'
import count from './reducers/count'
import { css } from 'glamor'
import { createState } from 'statext-reducer'

const CountState = createState(count)

export default function ReducerExample() {
  return (
    <div className={css({ paddingLeft: '20px', paddingRight: '20px' })}>
      <State>
        {({ count, timer: { lastClicked } }, dispatch) => (
          <React.Fragment>
            <p>count: {count}</p>
            <p>lastClicked: {lastClicked && lastClicked.toISOString()}</p>
            <p>
              <button
                onClick={() =>
                  dispatch({ type: 'CLICK', query: 'foo', time: new Date(Date.now()) })
                }
              >
                Click me
              </button>
            </p>
          </React.Fragment>
        )}
      </State>
      <CountState>{count => <p>Count again: {count}</p>}</CountState>
    </div>
  )
}
