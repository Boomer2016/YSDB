import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ConfigProvider } from 'antd'
import Header from './header'
import Footer from './footer'
import React from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'

// 公用的样式模块
export default class Frame extends React.Component {
  render () {
    const { children } = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <div>
          <Header />
          <main role="main">
            {children}
          </main>
          <Footer />
        </div>
      </ConfigProvider>
    )
  }
}
