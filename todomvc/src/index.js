import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'statext'
import { App } from './App'
import 'todomvc-app-css/index.css'

render(
  <Provider>
    <App />
  </Provider>,
  global.document.getElementById('root')
)
