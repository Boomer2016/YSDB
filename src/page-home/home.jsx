import { Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
// import '../component/side-slider'

import HomeStore from "./store-home"

const store = new HomeStore()

@observer
class Home extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    const { productHighLights, productAdvances } = store
    const highLights = productHighLights.map((item, i) => (
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={4}
        xl={4}
        className={`FBV FBAC ${i ? 'detail-item' : ''}`}
        key={item.id}
      >
        <span className="subtitle-font">{item.value}</span>
        <div className="highlight-border"></div>
        <span className="mini-font mt6">{item.name}</span>
      </Col>
    ))
    const homeAdvanceItems = productAdvances.map(item => (
      <Col
        key={item.id}
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        className="FBV FBAC advance-item"
      >
        <div className="advance-icon"></div>
        <span className="advance-name">{item.name}</span>
        <div className="thin mini-font fac">{item.value}</div>
      </Col>
    ))
    return (
      <div className="page-home">
        <div className="home-header FBV FBAC">
          <h1 className="home-header-title">YashanDB - SQL at SCALE</h1>
          <div className="home-header-content mini-font">
            YashanDB是一款定位于在线事务处理/在线分析处理（HTAP: Hybrid Transactional/Analytical Processing）
            的融合型数据库产品，实现了一键水平伸缩，强一致性的多副本数据安全，分布式事务，实时OLAP等重要特性。
            同时兼容 MySQL 协议和生态，迁移便捷，运维成本极低。
          </div>
          <button type="button" className="common-btn">立即开始</button>
          <div className="home-header-banner"></div>
        </div>
        <div className="home-highlight FBV">
          <div className="top-line"></div>
          <div className="FBAC-S">
            <LineTitle title="产品亮点" titleClass="subtitle-font" />
          </div>
          <div className="FBAC-S highlight-content">
            产品亮点文案补充，可补充一些吸引用户的相关利益点，
            产品亮点文案可补充一些吸引用户相关利益。产品亮点文案补充，产品亮点文案可补充
          </div>
          <Row gutter={8} className="highlight-detail FBAC-S FBJB">
            {highLights}
          </Row>
          <div className="bottom-line FBAE-S"></div>
        </div>
        <div className="home-advance FBV">
          <div className="FBAC-S">
            <LineTitle title="产品亮点" titleClass="subtitle-white" />
          </div>
          <div className="FBAC-S highlight-content">
            产品亮点文案补充，可补充一些吸引用户的相关利益点，
            产品亮点文案可补充一些吸引用户相关利益。产品亮点文案补充，产品亮点文案可补充
          </div>
          <Row gutter={16} className="advance-detail FBAC-S">
            {homeAdvanceItems}
          </Row>
        </div>
        {/* <div className="slider">

        </div> */}
        <div className="home-experience FBV">
          <LineTitle title="云数据库YashanDB等你来体验" titleClass="subtitle-white" />
          <div className="FBAC-S highlight-content m14">
            产品亮点文案补充，可补充一些吸引用户的相关利益点，
            产品亮点文案可补充一些吸引用户相关利益。产品亮点文案补充，产品亮点文案可补充
          </div>
          <button type="button" className="common-btn FBAC-S">立即体验</button>
        </div>
      </div>
    )
  }
}

export default inject('store')(Home)
