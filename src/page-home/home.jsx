import { Button, Modal } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"

import HomeStore from "./store-home"
import { observer } from "mobx-react"

const store = new HomeStore()

@observer
export default class Home extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    return <div className="page-home">home</div>
  }
}
