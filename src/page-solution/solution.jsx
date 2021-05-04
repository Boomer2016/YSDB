import { Button, Modal, Row, Col, Avatar } from "antd"
import { AntDesignOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import archPic from '../image/productarch.png'

import SolutionStore from "./store-solution"

const store = new SolutionStore()

@observer
class Solution extends Component {
  componentDidMount () {
    console.log(this.props, 1111)
    // store.getContent()
  }

  render () {
    const { advantages = [], painPoints = [] } = store
    const painPointsItems = painPoints.map(item => (
      <Col
        className="FBV point-item"
        xs={24}
        sm={24}
        md={12}
        lg={7}
        xl={7}
        key={item.id}
      >
        <span className="pt10 pl20">{item.name}</span>
        <span className="mini-font mt8 pl20 pr20">{item.value}</span>
      </Col>
    ))
    const advantageItems = advantages.map(item => (
      <Col
        className="FBV FBAC p8"
        xs={12}
        sm={12}
        md={10}
        lg={5}
        xl={5}
        key={item.id}
      >
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
        <span className="fac p10">{item.name}</span>
        <span className="mini-font fac">{item.value}</span>
      </Col>
    ))
    return (
      <div className="page-solution">
        <div className="solution-header FBV FBAC FBJC">
          <h1 className="solution-header-title">金融及解决方案</h1>
          <div className="solution-header-content mini-font">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <button type="button" className="common-btn">了解更多</button>
        </div>
        <div className="pain-points FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="痛点描述" />
          <div className="solution-header-content mini-font mt10 fac">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <Row justify="space-between" className="pt20">{painPointsItems}</Row>
        </div>
        <Row justify="space-between" className="solution-area">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={10}
            xl={10}
            className="solution-pic"
          >
            <img src={archPic} alt="解决方案" />
          </Col>
          <Col
            className="FBV"
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
            <LineTitle titleClass="subtitle-font" title="解决方案" show="right" className="FBJS pl10" />
            <span className="p10 mini-font">
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
            </span>
          </Col>
        </Row>
        <div className="advantage-area FBV FBAC">
          <LineTitle titleClass="subtitle-white" title="优势描述" />
          <div className="solution-header-content mini-font mt10">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <Row justify="space-between" className="pt20">{advantageItems}</Row>
        </div>
        <div className="case-area">
          <LineTitle titleClass="subtitle-font" title="案例名称" />
          <Row justify="space-between case-main">
            <Col
              xs={23}
              sm={23}
              md={11}
              lg={9}
              xl={9}
              className="case-pic"
            >
              <img src={archPic} alt="案例名称" />
            </Col>
            <Col
              className="FBV"
              xs={23}
              sm={23}
              md={11}
              lg={13}
              xl={13}
            >
              <span className="p10 mini-font">
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              </span>
              <button type="button" className="common-btn">了解更多</button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Solution)
