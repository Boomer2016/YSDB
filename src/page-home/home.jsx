import { Button, Col, Modal, Row } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { action, observable, toJS } from "mobx"
import { inject, observer } from "mobx-react"

import HomeStore from "./store-home"
import LineTitle from '../component/line-title'
import Slider from "react-slick"
import homeExpSrc from '../image/homeExp.svg'

const store = new HomeStore()

@observer
class Home extends Component {
  @observable startIndex = 0
  slider = React.createRef()
  timer = null

  componentDidMount () {
    this.bannerStart()
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  @action
  bannerStart = () => {
    this.timer = setInterval(() => {
      this.startIndex = this.startIndex + 1
    }, 5000)
  }

  render () {
    const { productHighLights, productAdvances, partners, bannerData } = store
    const activeIndex = toJS(this.startIndex) % bannerData.length
    const showItems = bannerData.slice(activeIndex)
    let actualShowitems = []
    if (showItems.length === 1) {
      actualShowitems = showItems.concat([bannerData[0], bannerData[1]])
    } else if (showItems.length === 2) {
      actualShowitems = showItems.concat(bannerData[0])
    } else {
      actualShowitems = showItems.slice(0, 3)
    }
    console.log(actualShowitems, 'actualShowitems', activeIndex)
    const settings = {
      className: "common-slider",
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

    const partnerItems = partners.map(item => (
      <div key={item.id} className="partner-item">
        <div className="FBV FBJC">
          <span className="p10">{item.content}</span>
          <span className="partner-item-name">
            ——
            {item.name}
            （
            {item.department}
            ）
          </span>
        </div>
        <img src={item.img} alt="合作伙伴" className="partner-item-src" />
      </div>
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
          <div className="home-header-banner">
            {actualShowitems.map((item, i) => (
              <div key={item.id} className={`banner-item ${i === 1 ? 'banner-active' : ''}`}>
                {i === 1 && <span>{item.title}</span>}
                {i === 1 && <span className="active-content-bottom">{item.content}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="home-highlight m-p2rem">
          <div className="FBV FBAC top-line">
            <LineTitle title="行业典范" titleClass="subtitle-font" />
            <div className="FBAC-S sub-content">
              产品亮点文案补充，可补充一些吸引用户的相关利益点，
              产品亮点文案可补充一些吸引用户相关利益。产品亮点文案补充，产品亮点文案可补充
            </div>
          </div>
          <Row gutter={8} className="highlight-detail" justify="space-between">
            {highLights}
          </Row>
        </div>
        <div className="home-advance m-p2rem">
          <div className="FBV FBAC top-line">
            <LineTitle title="产品亮点" titleClass="subtitle-font" />
            <div className="FBAC-S sub-content">
              产品亮点文案补充，可补充一些吸引用户的相关利益点，
              产品亮点文案可补充一些吸引用户相关利益。产品亮点文案补充，产品亮点文案可补充
            </div>
         </div>
          <Row gutter={16} className="advance-detail FBAC-S">
            {homeAdvanceItems}
          </Row>
        </div>
        <div className="partner-area">
          <LineTitle title="合作伙伴" titleClass="subtitle-font" className="t-FBJS" />
          <div className="FBH FBJB FBAC">
            <LeftOutlined className="left-icon" onClick={() => this.slider.current.slickPrev()} />
            <Slider {...settings}>
              {partnerItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
          </div>
        </div>
        <div className="home-experience FBV">
          <LineTitle title="云数据库YashanDB等你来体验" titleClass="subtitle-white" />
          <div className="FBAC-S sub-content m14">
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
