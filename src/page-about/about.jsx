import { Button, Modal } from 'antd'
import React, { Component } from "react"
import { action, observable } from "mobx"

import AboutStore from "./store-about"
import { observer } from "mobx-react"

const store = new AboutStore()

@observer
export default class About extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    return <div className="page-home">home</div>
  }
}
