import React from 'react'
import { render } from 'react-dom'
import { Provider, Logger, TimeTravel } from 'statext'
import { App } from './App'
import 'todomvc-app-css/index.css'

render(
  <Provider>
    <div>
      <TimeTravel />
      <Logger />
      <App />
    </div>
  </Provider>,
  global.document.getElementById('root')
)
