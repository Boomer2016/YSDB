import { Col, Row } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { getImgSrc, getModInfo } from '../common/util'
import { inject, observer } from "mobx-react"

import LineTitle from '../component/line-title'
import MODULE_CODE from './config'
import Slider from "react-slick"

@observer
class Product extends Component {
  slider = React.createRef()
  introSlider = React.createRef()

  componentWillMount () {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore, location: { pathname, search } } = this.props
    if (search) {
      const pageId = search.split('=') && search.split('=')[1]
      CommonStore.getPageInfo(pageId)
    } else {
      const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
      CommonStore.getPageInfo(activeItem.id)
    }
  }

  render () {
    const { CommonStore: { PAGE_MODULES = [] } } = this.props
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH } = MODULE_CODE
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
      // rtl: true,
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
    const introSettings = {
      className: "intro-slider",
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      rtl: true,
      ref: this.introSlider,
    }
    const partnerItems = getModInfo(PAGE_MODULES, SECOND, 'subList').map(item => (
      <div key={item.code} className="intro-item">
        <div className="FBH FBJC intro-item-content">
          {item.content}
        </div>
        <img src={getImgSrc(item.imageId)} alt="产品简介" className="intro-item-src" />
      </div>
    ))
    const powerItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map(item => (
      <Col
        className="FBV power-item"
        xs={24}
        sm={24}
        md={12}
        lg={8}
        xl={8}
        key={item.code}
      >
        <div className="item-title" title={item.title}>{item.title}</div>
        <span className="mini-font mt8 pl20 pr20">{item.content}</span>
      </Col>
    ))
    const sceneItems = getModInfo(PAGE_MODULES, FIFTH, 'subList').map(item => (
      <div key={item.code}>
        <div className="scene-item" style={{ backgroundImage: `url(${getImgSrc(item.imageId)})` }}>
          <div className="FB1 FBV">
            <span className="main-color">{item.title}</span>
            <span className="mini-font scene-content">{item.content}</span>
          </div>
          <button
            className="common-btn"
            type="button"
            onClick={() => {
              const { history } = this.props
              history.push(item.buttonUrl || '/cooperation')
            }}
          >
            {item.buttonTxt}
          </button>
        </div>
      </div>
    ))
    const valueItems = getModInfo(PAGE_MODULES, SIXTH, 'subList').map(item => (
      <Col
        className="value-item"
        xs={24}
        sm={24}
        md={12}
        lg={5}
        xl={5}
        key={item.code}
      >
        {/* <div className="value-icon" style={{background: `url(${getImgSrc(item.imageId)})`}}></div> */}
        <img src={getImgSrc(item.imageId)} alt="" className="value-icon" />
        <div className="p10 mini-font">{item.title}</div>
        <div className="fac" style={{ fontSize: '0.8rem' }}>{item.content}</div>
      </Col>
    ))
    return (
      <div className="page-product" id="page">
        <div className="product-header FBV FBAC FBJC ">
          <h1 className="product-header-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="product-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button
            type="button"
            className="common-btn"
            onClick={() => {
              const { history } = this.props
              history.push(getModInfo(PAGE_MODULES, FIRST, 'buttonUrl'))
            }}
          >
            {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
          </button>
        </div>
        {/* <div className="product-intro m-p2rem">
          <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} className="t-FBJS" />
          <div className="FBH FBJB FBAC">
            <LeftOutlined onClick={() => this.introSlider.current.slickPrev()} className="left-icon" />
            <Slider {...introSettings}>
              {partnerItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.introSlider.current.slickNext()} />
          </div>
        </div> */}
        <div className="product-intro m-p2rem">
          <Row gutter={8}>
            <Col
              className="intro-content FBV"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} className="t-FBJS" />
              <pre className="intro-detail">
                {getModInfo(PAGE_MODULES, SECOND, 'content')}
              </pre>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <img src={getImgSrc(getModInfo(PAGE_MODULES, SECOND, 'imageId'))} alt="产品简介" className="intro-pic fac" />
            </Col>
          </Row>
        </div>
        <div className="product-area m-p2rem">
          <div className="arch-pic fac">
            <img src={getImgSrc(getModInfo(PAGE_MODULES, THIRD, 'imageId'))} alt="产品架构" />
          </div>
          <div className="arch-content FBV">
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, THIRD, 'title')} className="t-FBJS" />
            <pre className="intro-detail">
              {getModInfo(PAGE_MODULES, THIRD, 'content')}
            </pre>
          </div>
        </div>
        <div className="service-power m-p2rem">
          <div className="service-title">
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, FOURTH, 'title')} className="t-FBJS" />
          </div>
          <div className="service-padding">
            <Row gutter={16} className="service-content FBAS-C">
              {powerItems}
            </Row>
          </div>
        </div>
        <div className="product-scene FBV FBAC m-p2rem">
          <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, FIFTH, 'title')} className="subBg FBJC" />
          <div className="product-header-content mini-font m-p2rem">
            {getModInfo(PAGE_MODULES, FIFTH, 'content')}
          </div>
          <div className="FBH FBJB FBAC">
            <LeftOutlined className="left-icon" onClick={() => this.slider.current.slickPrev()} />
            <Slider {...settings}>
              {sceneItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
          </div>
        </div>
        <div className="core-value FBV m-p2rem">
          <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SIXTH, 'title')} className="subBg FBJC" />
          <div className="product-header-content mini-font mt10">
            {getModInfo(PAGE_MODULES, SIXTH, 'content')}
          </div>
          <Row justify="space-between" className="scene-row">{valueItems}</Row>
          <div className="core-bottom"></div>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Product)
