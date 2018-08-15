import React from 'react'
import Async from './async'
import Reducer from './reducer'
import Playground from './playground'
import TodoMVC from './todo-mvc'
import TodoMVCRedux from './todo-mvc-redux'
import AsyncRedux from './async-redux'
import Movies from './movie-demo'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { css } from 'glamor'

const PLAYGROUND = 'playground'
const TODOMVC = 'todo-mvc'
const TODOMVC_REDUX = 'todo-mvc-redux'
const ASYNC_REDUX = 'async-redux'
const ASYNC = 'async'
const MOVIES = 'movies'
const REDUCER = 'reducer'

const exampleMap = {
  [ASYNC]: { component: Async, title: 'Async' },
  [MOVIES]: { component: Movies, title: 'Movies' },
  [TODOMVC]: { component: TodoMVC, title: 'TodoMVC' },
  [ASYNC_REDUX]: { component: AsyncRedux, title: 'Async (statext-redux)' },
  [TODOMVC_REDUX]: {
    component: TodoMVCRedux,
    title: 'TodoMVC (statext-redux)',
  },
  [PLAYGROUND]: { component: Playground, title: 'Playground' },
  [REDUCER]: { component: Reducer, title: 'Reducer' },
}

function Links() {
  return (
    <div
      className={css({
        width: '200px',
        height: '100vh',
        backgroundColor: '#333',
        position: 'fixed',
        left: '0',
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
      })}
    >
      {Object.keys(exampleMap).map(k => (
        <Link className={css({ color: 'white', marginBottom: '10px' })} key={k} to={k}>
          {exampleMap[k].title}
        </Link>
      ))}
    </div>
  )
}

function IndexRoute() {
  return (
    <div className={css({ textAlign: 'center', paddingTop: '30px' })}>
      {'These are some examples of how you can use Statext'}
    </div>
  )
}

export default function AppContainer() {
  return (
    <Router>
      <div>
        <Links />
        <div
          className={css({
            paddingLeft: '200px',
          })}
        >
          <Switch>
            <Route component={IndexRoute} exact path="/" />
            {Object.keys(exampleMap).map(k => (
              <Route component={exampleMap[k].component} key={k} path={'/' + k} />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  )
}
