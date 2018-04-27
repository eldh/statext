[![npm version](https://badge.fury.io/js/statext.svg)](https://badge.fury.io/js/statext) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Statext

A tiny global state management solution for React.

## Why?
React has a great mechanism for state management with its component state and props. In some cases you want to share pieces of information across different parts of the app, and then using just normal state and props becomes cumbersome. This is commonly solved by using state libraries like redux or mobx. 

However, these frameworks work outside the react component model and can feel heavy for simpler tasks.

Statext tries to provide a state management solution that feels lightweight and doesn't stray too far from the react way of doing things. It is primarily meant to used in smaller apps, or as a compliment to frameworks like apollo. You could build some nice abstractions on top of statext to make it work for larger apps though.

# How?
Statext is really just a thin layer of hacks on top of React's context feature. This also means it's tiny. 

A positive side-effect of Statext being just components is that it works out of the box with React's upcoming [Suspense](https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6) feature.

## API
Wrap your component with the `withSharedState` higher-order component. Then use `setState` in your component just as you normally would in React. 

## Example

There are a few runnable examples under `/packages`, including a TodoMVC and an example using React Suspense.

![Counter example](./example.gif)

This minimal example shows how to use Statext. It should look pretty familiar if you have worked with react before. 

The only difference from a normal react component is that `this.state` will be shared between all instances of `CountState`.

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

## Getting started
If you want to use statext in your app, run `yarn install statext` or `npm i statext`.

To start using this this repo, clone it and run `yarn && lerna bootstrap` in the root of the repo. Then run `cd packages/example-playground && yarn start` to start the playground. 

## Status
Statext is in its early phases. I don't recommend using it in production yet, but please try it out and report any issues.

## This looks similar to Unstated
[Unstated](https://github.com/jamiebuilds/unstated) is great! Statext has actually been around longer than Unstated and takes the concept even further, removing the need for a "Subscriber" component etc.
