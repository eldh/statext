import React from 'react'
import Header from './containers/Header'
import MainSection from './containers/MainSection'
import '../todo-mvc/todomvc.css'

export default () => (
  <div className="todoapp">
    <Header />
    <MainSection />
  </div>
)
