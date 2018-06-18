# Examples

To run the examples, run `yarn start` in this folder.

- **Async**: Use statext to fetch and display data with Suspense. It's a copy of the async example from Redux.
- **Movies**: Implementation of the movies demo from Dan Abramov's talk about [Suspense](https://www.youtube.com/watch?v=nLF0n9SACd4).
- **TodoMVC**: TodoMVC using statext.
- **Async (redux)**: The async example using redux actions and reducers. Does not use Suspense.
- **TodoMVC (redux)**: TodoMVC using redux actions and reducers. 
- **Playground**: A few minimal examples.

## About the examples
You will find that Statext is not used a lot in these examples. This is good! In smaller applications you probably won't need Statext very often either. Think of it more as an escape hatch when you need to share state across different parts of the app. 

Two of the examples show how to use statext together with redux actions and reducers. In these examples, *only the containers have changed* from the pure redux implementations.

Two examples show how Statext works together with React's upcoming Suspense feature. 