import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'


export default class DocumentsStore {
  @observable docTree = []

  @action async getDocTree () {
    try {
      const res = await io.getDocTree()
      runInAction(() => {
        this.docTree = res
      })
      return res
    } catch (e) {
      message.error(e.message)
      return false
    }
  }
}
