import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { Provider } from 'statext'

render(
  <Provider>
    <App />
  </Provider>,
  global.document.getElementById('root')
)
