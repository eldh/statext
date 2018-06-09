import React from 'react'
import Header from './containers/Header'
import MainSection from './containers/MainSection'
import { Provider, Logger } from 'statext'

export const App = () => (
  <Provider>
    <Logger />
    <div className="todoapp">
      <Header />
      <MainSection />
    </div>
  </Provider>
)
