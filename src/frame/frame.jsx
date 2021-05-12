import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { action, observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { ConfigProvider } from 'antd'
import Footer from './footer'
import Header from './header'
import React from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'

@inject('CommonStore')
@observer
class Frame extends React.Component {
  @observable couldRender = false

  componentDidMount () {
    const { CommonStore } = this.props
    this.routerChange()
    CommonStore.getFooterNavs()
  }

  // 路由不变，对应的search发生改变情况
  componentDidUpdate (preProps) {
    const { location: { pathname, search } } = this.props
    if (preProps.location.pathname === pathname && preProps.location.search !== search) {
      this.routerChange()
    }
  }

  @action
  routerChange = () => {
    const { CommonStore, location } = this.props
    this.couldRender = false
    CommonStore.getMainNavs().then(res => {
      if (location.search) {
        const activeItem = res.find(item => item.url === location.pathname) || {}
        const pageId = location.search.split('=') && location.search.split('=')[1]
        const activeSubItem = activeItem.subList.find(item => +item.id === +pageId)
        CommonStore.setActivePage(activeSubItem)
      } else {
        // 处理从根目录/  重定向到 /home的情况
        const targetUrl = location.pathname === '/' ? '/home' : location.pathname
        const activeItem = res.find(item => item.url === targetUrl) || {}
        CommonStore.setActivePage(activeItem)
      }
      this.couldRender = true
    })
  }

  render () {
    const { children, CommonStore } = this.props
    return (
      <ConfigProvider locale={zhCN}>
        <div className="FBV frame">
          <Header CommonStore={CommonStore} />
          <div className="FB1 frame-main">
            {this.couldRender && (
              <main role="main">
                {children}
              </main>
            )}
            <Footer CommonStore={CommonStore} />
          </div>
        </div>
      </ConfigProvider>
    )
  }
}

export default Frame
