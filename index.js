import React from 'react'

export default class SharedStateComponent extends React.Component {
  constructor(props) {
    super(props)
    this._setState = this.setState
    this.setState = SharedStateComponent.setAllTheStates
    SharedStateComponent._state = SharedStateComponent._state || this.constructor.state
    this.state = SharedStateComponent._state
    SharedStateComponent.instances.set(this, this)
  }
  componentWillMount() {
    SharedStateComponent.instances.set(this, this)
  }
  componentWillUnmount() {
    SharedStateComponent.instances.delete(this)
  }
  static setAllTheStates = updater => {
    SharedStateComponent._state = updater(SharedStateComponent._state)
    SharedStateComponent.instances.forEach(i => {
      i._setState(SharedStateComponent._state)
    })
  }
  static getState() {
    return SharedStateComponent._state
  }
  static instances = new Map()
}
