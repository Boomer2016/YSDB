import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ConfigProvider } from 'antd'
import Header from './header'
import React from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'

// 公用的样式模块
export default class Frame extends React.Component {
  render () {
    const { children } = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <div className="FBV">
          <Header />
          <main role="main" className="container">
            <div>{children}</div>
          </main>
          <div className="common-footer">
            <div className="footer-logo">111</div>
            <div className="friend-links">
              222
            </div>
            <div className="qrcode">
              二维码
            </div>
          </div>
        </div>
      </ConfigProvider>
    )
  }
}
