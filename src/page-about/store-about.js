import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'

export default class AboutStore {
  @observable news = []

  @action async getNews () {
    try {
      const res = await io.getNews()
      runInAction(() => {
        this.news = res
      })
    } catch (e) {
      message.error(e.message)
    }
  }

}
