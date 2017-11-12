import React from 'react'

export default class SharedStateComponent extends React.Component {
  constructor(props) {
    super(props)
    this._s = this.setState
    this.setState = SharedStateComponent.setAllTheStates
    SharedStateComponent.instances[this] = this
  }
  static setAllTheStates = updater => {
    const update = s => ({ ...s, ...updater(s) })
    SharedStateComponent.instances.forEach(i => {
      i._s(update)
    })
  }
  static instances = Map()

  componenentWillMount() {
    SharedStateComponent.instances[this] = this
  }

  componenentWillUnmount() {
    delete SharedStateComponent.instances[this]
  }
}
