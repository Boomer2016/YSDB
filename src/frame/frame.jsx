import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { ConfigProvider } from 'antd'
import Header from './header'
import Footer from './footer'
import React from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { inject, observer } from 'mobx-react'
import { toJS, observable, action } from 'mobx'


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
        const activeItem = res.find(item => item.url === location.pathname) || {}
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
