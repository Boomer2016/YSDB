import { Button, Modal, Row, Col, Avatar } from "antd"
import { AntDesignOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons'
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import archPic from '../image/productarch.png'
import Slider from "react-slick"

import SolutionStore from "./store-solution"

const store = new SolutionStore()

@observer
class Solution extends Component {
  slider = React.createRef()

  componentWillMount() {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore } = this.props
    CommonStore.getPageInfo(CommonStore.ACTIVE_PAGE.id)
    this.bannerStart()
  }

  render () {
    const { advantages = [], painPoints = [], solutions } = store
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
    const settings = {
      className: "solution-slider",
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      rtl: true,
      ref: this.slider,
    }
    const solutionItems = solutions.map(item => (
      <div className="case-main" key={item.id}>
        <div className="subBg">
          <LineTitle titleClass="subtitle-font" title={item.name} />
        </div>
        <div className="solotion-item-content">
          <div className="case-pic">
            <img src={item.src} alt={item.name} />
          </div>
          <div className="FBV FBJB">
            <span className="mini-font">
              {item.content}
            </span>
            <button type="button" className="common-btn">了解更多</button>
          </div>
        </div>
      </div>
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
        <div className="pain-points FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title="痛点描述" />
            <div className="solution-header-content mini-font mt10 fac">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
            </div>
          </div>
          <Row justify="space-between" className="points-row">{painPointsItems}</Row>
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
            <LineTitle titleClass="subtitle-font" title="解决方案" />
            <span className="p10 mini-font">
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
            </span>
          </Col>
        </Row>
        <div className="advantage-area FBV FBAC m-p2rem">
          <div className="subBg FBV FBAC">
            <LineTitle titleClass="subtitle-font" title="优势描述" />
            <div className="solution-header-content mini-font mt10">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
            </div>
          </div>
          <Row justify="space-between" className="pt20">{advantageItems}</Row>
        </div>
        <div className="case-area m-p2rem FBH FBAC FBJB">
          <LeftOutlined onClick={() => this.slider.current.slickPrev()} className="left-icon" />
          <Slider {...settings}>
            {solutionItems}
          </Slider>
          <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Solution)
