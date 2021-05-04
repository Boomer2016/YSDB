import { action, configure, observable, runInAction } from 'mobx'

import io from './io-common'
import { message } from 'antd'

configure({ isolateGlobalState: true })
class CommonStore {
  // 页面菜单
  @observable menus = []
  @observable footerLinks = []

  // 获取菜单列表
  @action async getMainNavs () {
    try {
      const res = await io.getMainNavs()
      runInAction(() => {
        this.menus = res
      })
      return true
    } catch (e) {
      message.error(e.message)
      return false
    }
  }

  // 获取底部导航
  @action async getFooterNavs () {
    try {
      const res = await io.getFooterNavs()
      runInAction(() => {
        this.footerLinks = res
      })
    } catch (e) {
      message.error(e.message)
    }
  }

  @action async getPageInfo (id) {
    try {
      const res = await io.getPageInfo(id)
      return res
    } catch (e) {
      message.error(e.message)
      return false
    }
  }
}

export default new CommonStore()
