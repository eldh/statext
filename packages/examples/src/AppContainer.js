import React from 'react'
import Async from './async'
import Playground from './playground'
import TodoMVC from './todo-mvc'
import TodoMVCRedux from './todo-mvc-redux'
import AsyncRedux from './async-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const PLAYGROUND = 'playground'
const TODOMVC = 'todo-mvc'
const TODOMVC_REDUX = 'todo-mvc-redux'
const ASYNC_REDUX = 'async-redux'
const ASYNC = 'async'

const componentMap = {
  [TODOMVC]: TodoMVC,
  [PLAYGROUND]: Playground,
  [ASYNC]: Async,
  [ASYNC_REDUX]: AsyncRedux,
  [TODOMVC_REDUX]: TodoMVCRedux,
}

const titleMap = {
  [PLAYGROUND]: 'Playground',
  [ASYNC]: 'Async',
  [TODOMVC]: 'TodoMVC',
  [ASYNC_REDUX]: 'Async (statext-redux)',
  [TODOMVC_REDUX]: 'TodoMVC (statext-redux)',
}

function Links() {
  return (
    <div
      style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#333',
        position: 'fixed',
        left: '0',
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
      }}
    >
      {Object.keys(titleMap).map(k => (
        <Link key={k} style={{ color: 'white', marginBottom: '10px' }} to={k}>
          {titleMap[k]}
        </Link>
      ))}
    </div>
  )
}

function IndexRoute() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      {'These are some examples of how you can use Statext'}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div>
        <Links />
        <div style={{ paddingLeft: '240px', paddingRight: '20px' }}>
          <Switch>
            <Route component={IndexRoute} exact path="/" />
            {Object.keys(titleMap).map(k => <Route component={componentMap[k]} key={k} path={'/' + k} />)}
          </Switch>
        </div>
      </div>
    </Router>
  )
}
