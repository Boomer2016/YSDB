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
        <div>
          <Header />
          <main role="main">
            {children}
          </main>
          <footer className="container">
            <p className="float-right"><a href="#">Back to top</a></p>
            <p>
              &copy; 2017-2021 Company, Inc. &middot;
              <a href="#">Privacy</a>
              &middot;
              <a href="#">Terms</a>
            </p>
          </footer>
        </div>
      </ConfigProvider>
    )
  }
}
