import { Col, Row } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { action, observable, toJS } from "mobx"
import { inject, observer } from "mobx-react"

import LineTitle from '../component/line-title'
import Slider from "react-slick"
import MODULE_CODE from './config'
import { getModInfo, getImgSrc } from '../common/util'
import { Link } from "react-router-dom"

@observer
class Home extends Component {
  @observable startIndex = 0
  slider = React.createRef()
  timer = null

  componentWillMount() {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore } = this.props
    CommonStore.getPageInfo(CommonStore.ACTIVE_PAGE.id)
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
    const { CommonStore: {PAGE_MODULES = []} } = this.props
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH } = MODULE_CODE
    const bannerData = getModInfo(PAGE_MODULES, SECOND, 'subList')
    const activeIndex = bannerData.length ? toJS(this.startIndex) % bannerData.length : 0
    const showItems = bannerData.slice(activeIndex)
    let actualShowitems = []
    if (showItems.length === 1) {
      actualShowitems = showItems.concat([bannerData[0], bannerData[1]])
    } else if (showItems.length === 2) {
      actualShowitems = showItems.concat(bannerData[0])
    } else {
      actualShowitems = showItems.slice(0, 3)
    }
    // console.log(actualShowitems, 'actualShowitems', activeIndex)
    const settings = {
      className: "partner-slider",
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
    const highLights = getModInfo(PAGE_MODULES, THIRD, 'subList').map((item, i) => (
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={4}
        xl={4}
        className={`FBV FBAC ${i ? 'detail-item' : ''}`}
        key={item.code}
      >
        <span className="subtitle-font">{item.content}</span>
        <div className="highlight-border"></div>
        <span className="mini-font mt6 fac">{item.title}</span>
      </Col>
    ))
    const homeAdvanceItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map(item => (
      <Col
        key={item.code}
        xs={12}
        sm={12}
        md={12}
        lg={5}
        xl={5}
        className="FBV FBAC advance-item"
      >
        <div className="advance-icon">
          <img src={getImgSrc(item.imageId)} alt="" />
        </div>
        <span className="advance-name main-color">{item.title}</span>
        <div className="thin mini-font fac">{item.content}</div>
      </Col>
    ))

    const partnerItems = getModInfo(PAGE_MODULES, FIFTH, 'subList').map(item => (
      <div key={item.code} className="partner-item">
        <div className="FBV FBJC">
          <span className="p10">{item.content}</span>
          <span className="partner-item-name">
            ——
            {item.title}
          </span>
        </div>
        <img src={getImgSrc(item.imageId)} alt="合作伙伴" className="partner-item-src" />
      </div>
    ))

    return (
      <div className="page-home">
        <div className="home-header FBV FBAC">
          <h1 className="home-header-title">{getModInfo(PAGE_MODULES, FIRST, 'title')}</h1>
          <div className="home-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button type="button" className="common-btn">
            <Link to={getModInfo(PAGE_MODULES, FIRST, 'buttonUrl')}>
              {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
            </Link>
          </button>
          <div className="home-header-banner">
            {actualShowitems.map((item, i) => (
              <div
                key={item.code}
                className={`banner-item ${i === 1 ? 'banner-active' : ''}`}
                style={{backgroundImage: `url(${getImgSrc(item.imageId)})`}}
              >
                {i === 1 && <span>{item.title}</span>}
                {i === 1 && <span className="active-content-bottom">{item.content}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="home-highlight m-p2rem">
          <div className="FBV FBAC top-line">
            <LineTitle title={getModInfo(PAGE_MODULES, THIRD, 'title')} titleClass="subtitle-font" />
            <div className="FBAC-S sub-content">
              {getModInfo(PAGE_MODULES, THIRD, 'content')}
            </div>
          </div>
          <Row gutter={8} className="highlight-detail" justify="space-between">
            {highLights}
          </Row>
        </div>
        <div className="home-advance m-p2rem">
          <div className="FBV FBAC top-bird">
            <LineTitle title={getModInfo(PAGE_MODULES, FOURTH, 'title')} titleClass="subtitle-font" />
            <div className="FBAC-S fac mini-font">
              {getModInfo(PAGE_MODULES, FOURTH, 'content')}
            </div>
          </div>
          <Row className="advance-detail" justify="space-between">
            {homeAdvanceItems}
          </Row>
        </div>
        <div className="partner-area m-p2rem">
          <LineTitle title={getModInfo(PAGE_MODULES, FIFTH, 'title')} titleClass="subtitle-font" className="t-FBJS" />
          <div className="FBH FBJB FBAC">
            <LeftOutlined onClick={() => this.slider.current.slickPrev()} className="left-icon" />
            <Slider {...settings}>
              {partnerItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
          </div>
          <div className="right-middle-line"></div>
        </div>
        <div className="home-experience FBV">
          <LineTitle title={getModInfo(PAGE_MODULES, SIXTH, 'title')} titleClass="subtitle-white" />
          <div className="FBAC-S sub-content m14">
            {getModInfo(PAGE_MODULES, SIXTH, 'content')}
          </div>
          <button type="button" className="common-btn FBAC-S">
            <Link to={getModInfo(PAGE_MODULES, SIXTH, 'buttonUrl')}>
              {getModInfo(PAGE_MODULES, SIXTH, 'buttonTxt')}
            </Link>
          </button>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Home)
