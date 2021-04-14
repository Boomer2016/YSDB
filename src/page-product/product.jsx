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
    const {servicePowers} = store
    const powerItems = servicePowers.map(item => (
      <Col
        className="FBV power-item"
        xs={12}
        sm={12}
        md={12}
        lg={8}
        xl={8}
        key={item.id}
      >
        <span>{item.name}</span>
        <span>{item.value}</span>
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
        <div className="product-arch FBH FBJB">
          <div className="arch-pic">
            <img src={archPic} alt="产品架构" />
          </div>
          <div className="arch-content FBV">
            <LineTitle titleClass="subtitle-font" title="产品架构" show="right" className="FBJS" />
            <span className="pt20">
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
            </span>
          </div>
        </div>
        <div className="service-power">
          <div className="service-title">
            <LineTitle titleClass="subtitle-white" title="服务能力" />
          </div>
          <Row gutter={16} className="service-content FBAS-C">
            {powerItems}
          </Row>
        </div>
      </div>
    )
  }
}

export default inject('store')(Product)
