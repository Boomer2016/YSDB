import { action, configure, observable, runInAction } from 'mobx'

import io from './io-common'
import { message } from 'antd'

configure({ isolateGlobalState: true })
class CommonStore {
  // 页面菜单
  @observable PAGES = []
  // 当前菜单信息
  @observable ACTIVE_PAGE = {}
  // 当前菜单下的模块信息
  @observable PAGE_MODULES = []
  // 底部菜单信息
  @observable FOOTER_LINKS = []

  // 获取菜单列表
  @action async getMainNavs () {
    try {
      const res = await io.getMainNavs()
      runInAction(() => {
        this.PAGES = res
      })
      return res
    } catch (e) {
      message.error(e.message)
      return false
    }
  }

  @action setActivePage = pageInfo => {
    this.ACTIVE_PAGE = pageInfo
  }

  // 获取底部导航
  @action async getFooterNavs () {
    try {
      const res = await io.getFooterNavs()
      runInAction(() => {
        this.FOOTER_LINKS = res
      })
    } catch (e) {
      message.error(e.message)
    }
  }

  @action async getPageInfo (id) {
    try {
      const res = await io.getPageInfo(id)
      runInAction(() => {
        this.PAGE_MODULES = res
      })
    } catch (e) {
      message.error(e.message)
    }
  }

  @action setPageModules = modules => {
    this.PAGE_MODULES = modules
  }
}

export default new CommonStore()
