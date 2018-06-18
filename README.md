[![npm version](https://badge.fury.io/js/statext.svg)](https://badge.fury.io/js/statext) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Statext

A tiny global state management solution for React.

## Why?
React has a great mechanism for state management with its component state and props. In some cases you want to share pieces of information across different parts of the app, and then using just normal state and props becomes cumbersome. This is commonly solved by using state libraries like redux or mobx. 

However, these frameworks work outside the React component model and can feel heavy for simpler tasks.

Statext tries to provide a state management solution that feels lightweight and doesn't stray too far from the React way of doing things.

# How?
Statext is really just a thin layer on top of React's context feature. This also means it's tiny, and blazing. 

Statext is built to work out of the box with React's upcoming [Suspense](https://medium.com/@baphemot/understandingRreact-suspense-1c73b4b0b1e6) feature. Look at the [examples](https://github.com/eldh/statext/tree/master/packages/examples) to see how that works.

## API
Wrap your component with the `withSharedState` higher-order component. Then use `setState` in your component just as you normally would in React. 

## Examples
There are a few runnable examples under `/packages/examples`, including a TodoMVC and an example using React Suspense. There are also a few examples using `statext-redux`, which allows you to use Statext together with redux action creators and reducers.

![Counter example](./example.gif)

This minimal example should look pretty familiar if you have worked with React before. Statext is, in essence, *just React components*.

The only difference from a normal React component is that `this.state` will be shared between all instances of `CountState`.

```js
// CountState.js

import React from 'react'
import PropTypes from 'prop-types'
import { withSharedState } from 'statext'

class CountState extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }
  state = {
    count: 0,
  }

  increaseCount = () => {
    this.setState(s => ({
      count: s.count + 1,
    }))
  }

  render() {
    return this.props.render(this.state, { increaseCount: this.increaseCount })
  }
}

export default withSharedState(CountState)
```

You use `CountState` in your application just like you would use any other component. It will render all instances with the same `count` value. Your application needs to be wrapped in a `Provider`.

```js
// App.js

import React from 'react'
import { Provider } from 'statext'
import CountState from './components/CountState'

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <div>
          <CountState render={({ count }) => `The count is ${count}`} />
          <CountState
            render={({ count }, { increaseCount }) => (
              <button onClick={increaseCount}>{'Click me ' + count}</button>
            )}
          />
        </div>
      </Provider>
    )
  }
}
```

## Thinking in statext
A few things worth thinking about when using Statext:

- **Use Statext as little as possible.** Most of the time you will only use the state in one place, so you can just use normal React component state. Only use Statext when you need to share state. Making that change is easy.
- **Separate state and rendering.** If your stateful components only take care of keeping state, not rendering, sharing that state (with Statext) will be a one-line change. Use [render props](https://reactjs.org/docs/render-props.html)!
- **Build on top of Statext.** You can compose state and functionality the same way you normally would in React – using components and functions. Find the abstractions that work for you.

## Getting started
If you want to use Statext in your app, run `yarn install statext` or `npm i statext`.

To start using this this repo, clone it and run `yarn && lerna bootstrap` in the root of the repo. Then run `cd packages/examples && yarn start` to start the examples. 

## Status
Statext is in its early phases. I don't recommend using it in production yet, but please try it out and report any issues. 