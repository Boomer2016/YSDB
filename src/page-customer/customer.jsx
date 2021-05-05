import { Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import solutionSrc from '../image/solution.png'

import CustomerStore from "./store-customer"

const store = new CustomerStore()

@observer
class Customer extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    const { caseDescs = [], customerEarns = [] } = store
    const caseItems = caseDescs.map(item => (
      <Col
        className="FBH case-item FBAS"
        xs={23}
        sm={23}
        md={11}
        lg={11}
        xl={11}
        key={item.id}
      >
        <span className="pr10">{item.name}</span>
        <span className="mini-font FB1">{item.value}</span>
      </Col>
    ))
    const painPointsItems = customerEarns.map(item => (
      <Col
        className="FBV earn-item"
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
    return (
      <div className="page-customer">
        <div className="customer-header FBV FBAC">
          <h1 className="customer-header-title">中国银行客户案例</h1>
          <div className="customer-header-content mini-font">
          YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <button type="button" className="common-btn">立即开始</button>
        </div>
        <div className="case-desc FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title="案例描述" />
            <div className="mini-font mt10 fac">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
            </div>
          </div>
          <Row justify="space-between" className="pt20">{caseItems}</Row>
        </div>
        <div className="solution-area FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="解决方案" />
          <div className="mini-font mt10 fac">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <img src={solutionSrc} alt="解决方案" className="solution-src" />
        </div>
        <div className="customer-earns FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title="客户收益" />
            <div className="mini-font mt10 fac">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
            </div>
          </div>
          <Row justify="space-between" className="earn-row">{painPointsItems}</Row>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Customer)
