import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { inject, observer } from 'mobx-react'
import { observable, toJS } from 'mobx'

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
    CommonStore.getMainNavs().then(res => {
      if (res) this.couldRender = true
    })
    CommonStore.getFooterNavs()
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
