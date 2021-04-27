import { Button, Col, Modal, Row } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import LineTitle from '../component/line-title'
import ProductStore from "./store-product"
import archPic from '../image/productarch.png'
import Slider from "react-slick"

const store = new ProductStore()

@observer
class Product extends Component {
  slider = React.createRef()
  componentDidMount () {
    // store.getContent()
  }

  render () {
    const { servicePowers, productScenes, coreValues } = store
    const settings = {
      className: "common-slider",
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      ref: this.slider,
      adaptiveHeight: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      rtl: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
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
        <h5 className="pl20 pr20 item-title">{item.name}</h5>
        <span className="mini-font mt8 pl20 pr20">{item.value}</span>
      </Col>
    ))
    const sceneItems = productScenes.map(item => (
      <div key={item.id}>
        <div className="scene-item" style={{ backgroundImage: `url(${item.src})` }}>
          <div className="FB1 FBV">
            <span className="pl20 pr20 main-color">{item.name}</span>
            <span className="mini-font mt8 pl20">{item.value}</span>
          </div>
          <button className="common-btn ml20" type="button">了解更多</button>
        </div>
      </div>
    ))
    const valueItems = coreValues.map(item => (
      <Col
        className="FBV value-item FBAC FBJC"
        xs={24}
        sm={24}
        md={12}
        lg={5}
        xl={5}
        key={item.id}
      >
        <div className="value-icon"></div>
        <span className="p10">{item.name}</span>
        <span className="mini-font fac">{item.value}</span>
      </Col>
    ))
    return (
      <div className="page-product">
        <div className="product-header FBV FBAC FBJC ">
          <h1 className="product-header-title">YashanDB 产品体系</h1>
          <div className="product-header-content mini-font">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <button
            type="button"
            className="common-btn"
            onClick={() => {
              const { history } = this.props
              history.push('./cooperation-ecological')
            }}
          >
            了解更多
          </button>
        </div>
        <div className="product-area m-p2rem">
          <Row gutter={8}>
            <Col
              className="intro-content FBV m-p2rem"
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
            >
              <LineTitle titleClass="subtitle-font" title="产品简介" className="t-FBJS" />
              <span className="intro-detail">
                YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
                YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              </span>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={14}
              lg={14}
              xl={14}
              className="intro-pic fac"
            >
              <img src={archPic} alt="产品简介" />
            </Col>
          </Row>
          <Row gutter={8} className="arch-area m-p2rem">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              className="arch-pic fac"
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
              <LineTitle titleClass="subtitle-font" title="产品架构" className="t-FBJS" />
              <span className="intro-detail">
                YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
                YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度
              </span>
            </Col>
          </Row>
        </div>
        <div className="service-power m-p2rem">
          <div className="service-title">
            <LineTitle titleClass="subtitle-font" title="服务能力" className="t-FBJS" />
          </div>
          <div className="service-padding">
            <Row gutter={16} className="service-content FBAS-C">
              {powerItems}
            </Row>
          </div>
        </div>
        <div className="product-scene FBV FBAC m-p2rem">
          <LineTitle titleClass="subtitle-font" title="产品场景" />
          <div className="product-header-content mini-font m-p2rem">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <div className="FBH FBJB FBAC">
            <LeftOutlined className="left-icon" onClick={() => this.slider.current.slickPrev()} />
            <Slider {...settings}>
              {sceneItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
          </div>
        </div>
        <div className="core-value FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="核心价值" />
          <div className="product-header-content mini-font mt10">
            YashanDB 是深圳计算科学研究院 CoD(Conquest of Data)团队完全自研的新型大数
            据分布式实时分析数据 (边框文本)
          </div>
          <Row justify="space-between" className="pt20 scene-row">{valueItems}</Row>
        </div>
      </div>
    )
  }
}

export default inject('store')(Product)
