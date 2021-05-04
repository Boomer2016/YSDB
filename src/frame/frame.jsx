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
import { toJS, observable } from 'mobx'


@inject('CommonStore')
@observer
class Frame extends React.Component {
  @observable couldRender = false
  componentDidMount() {
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
