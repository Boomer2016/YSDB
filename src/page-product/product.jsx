import { Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'

import ProductStore from "./store-product"
import archPic from '../image/productarch.png'

const store = new ProductStore()

@observer
class Product extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    const {servicePowers, productScenes} = store
    const powerItems = servicePowers.map(item => (
      <Col
        className="FBV power-item"
        xs={24}
        sm={24}
        md={12}
        lg={8}
        xl={8}
        key={item.id}
      >
        <span className="pl20 pr20">{item.name}</span>
        <span className="mini-font mt8 pl20 pr20">{item.value}</span>
      </Col>
    ))
    const sceneItems = productScenes.map(item => (
      <Col
        className="FBV scene-item"
        xs={24}
        sm={24}
        md={12}
        lg={6}
        xl={6}
        key={item.id}
        style={{backgroundImage: `url(${item.src})`}}
      >
        <div className="FB1 FBV">
          <span className="pl20 pr20">{item.name}</span>
          <span className="mini-font mt8 pl20 pr20">{item.value}</span>
        </div>
        <button className="common-btn ml20" type="button">了解更多</button>
      </Col>
    ))
    const valueItems = productScenes.map(item => (
      <Col
        className="FBV value-item FBAC FBJC"
        xs={24}
        sm={24}
        md={12}
        lg={6}
        xl={6}
        key={item.id}
      >
        <div className="value-icon"></div>
        <span className="pl20 pr20">{item.name}</span>
        <span className="mini-font mt8 pl20 pr20">{item.value}</span>
      </Col>
    ))
    return (
      <div className="page-product">
        <div className="product-header FBV FBAC FBJC">
          <h1 className="product-header-title">YashanDB 产品体系</h1>
          <div className="product-header-content mini-font">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <button type="button" className="common-btn">了解更多</button>
        </div>
        <div className="product-arch">
          <Row gutter={8}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              className="arch-pic"
            >
              <img src={archPic} alt="产品架构" />
            </Col>
            <Col
              className="arch-content FBV"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <LineTitle titleClass="subtitle-font" title="产品架构" show="right" className="FBJS pl10" />
              <span className="p10">
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              </span>
            </Col>
          </Row>
        </div>
        <div className="service-power">
          <div className="service-title">
            <LineTitle titleClass="subtitle-white" title="服务能力" />
          </div>
          <div className="service-padding">
            <Row gutter={16} className="service-content FBAS-C">
              {powerItems}
            </Row>
          </div>
        </div>
        <div className="product-scene FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="产品场景" />
          <div className="product-header-content mini-font mt10">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <Row gutter={[16, 16]} className="pt20">{sceneItems}</Row>
        </div>
        <div className="core-value FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="核心价值" />
          <div className="product-header-content mini-font mt10">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <Row gutter={[16, 16]} className="pt20 scene-row">{valueItems}</Row>
        </div>
      </div>
    )
  }
}

export default inject('store')(Product)
