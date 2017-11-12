import React from 'react'

export default class SharedStateComponent extends React.Component {
  constructor(props) {
    super(props)
    this._s = this.setState
    this.setState = SharedStateComponent.setAllTheStates
    SharedStateComponent.instances.push(this)
  }
  static setAllTheStates = updater => {
    const update = s => ({ ...s, ...updater(s) })
    for (const i of SharedStateComponent.instances) {
      if (i) {
        i._s(update)
      }
    }
  }
  static instances = []
}
