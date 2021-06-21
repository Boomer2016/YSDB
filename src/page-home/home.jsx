/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Col, Row } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { action, observable, toJS } from "mobx"
import { inject, observer } from "mobx-react"

import LineTitle from '../component/line-title'
import Slider from "react-slick"
import MODULE_CODE from './config'
import { getModInfo, getImgSrc } from '../common/util'
import logoTxtSrc from '../image/logoTxt.jpg'

@observer
class Home extends Component {
  @observable indexes = {
    previousIndex: 2,
    currentIndex: 0,
    nextIndex: 1,
  }
  @observable bannerData = []
  slider = React.createRef()
  timer = null

  componentWillMount () {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore, location: { pathname } } = this.props
    const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
    const { SECOND } = MODULE_CODE
    CommonStore.getPageInfo(activeItem.id).then(() => {
      let bannerData = getModInfo(CommonStore.PAGE_MODULES, SECOND, 'subList')
      if (bannerData.length && bannerData.length === 1) {
        bannerData = [...bannerData, { ...bannerData[0], code: '1.2.2' }, { ...bannerData[0], code: '1.2.3' }]
      } else if (bannerData.length && bannerData.length === 2) {
        bannerData = [...bannerData, { ...bannerData[0], code: '1.2.3' }]
      }
      this.bannerData = bannerData
      this.indexes = {
        previousIndex: bannerData.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      }
    })
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
      if (this.indexes.currentIndex <= 0) {
        this.indexes = {
          previousIndex: this.bannerData.length - 2,
          currentIndex: this.bannerData.length - 1,
          nextIndex: 0,
        }
      } else {
        this.indexes = {
          previousIndex: this.indexes.currentIndex - 1 <= 0 ? this.bannerData.length - 1 : this.indexes.currentIndex - 2,
          currentIndex: this.indexes.currentIndex - 1,
          nextIndex: this.indexes.currentIndex,
        }
      }
    }, 5000)
  }

  @action
  setCardStatus = (indexes, cardIndex) => {
    // console.log(indexes, cardIndex);
    if (indexes.currentIndex === cardIndex) {
      return 'banner-active'
    } if (indexes.nextIndex === cardIndex) {
      return 'banner-next'
    } if (indexes.previousIndex === cardIndex) {
      return 'banner-prev'
    }
    return 'banner-inactive'
  }

  render () {
    const { CommonStore: { PAGE_MODULES = [] } } = this.props
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH } = MODULE_CODE
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
    const hLen = getModInfo(PAGE_MODULES, THIRD, 'subList').length
    const grid = hLen < 5 ? hLen : 5
    const percent = hLen < 5 ? `${100 / hLen}%` : '20%'
    const highLights = getModInfo(PAGE_MODULES, THIRD, 'subList').map((item, i) => (
      <div className={`FBV FBAC ${i % grid ? 'detail-item' : ''}`} key={item.code}>
        <span className="subtitle-font">{item.content}</span>
        <div className="highlight-border"></div>
        <span className="mini-font mt6 fac">{item.title}</span>
      </div>
    ))
    const col = !(getModInfo(PAGE_MODULES, FOURTH, 'subList').length % 3) ? 7 : 5
    const homeAdvanceItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map(item => (
      <Col
        key={item.code}
        xs={22}
        sm={22}
        md={12}
        lg={col}
        xl={col}
        className="FBV FBAC advance-item"
      >
        <div className="advance-icon">
          <img src={getImgSrc(item.imageId)} alt="" />
        </div>
        <span className="advance-name main-color fac">{item.title}</span>
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
          <h1 className="home-header-title">
            <img src={logoTxtSrc} alt="" className="logo-text" />
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="home-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button
            type="button"
            className="common-btn"
            onClick={() => {
              const { history } = this.props
              history.push(getModInfo(PAGE_MODULES, FIRST, 'buttonUrl') || '/cooperation')
            }}
          >
            {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
          </button>
          <div className="home-header-banner">
            <ul className="banner-container">
              {this.bannerData.map((item, i) => {
                return (
                  <li
                    key={item.code}
                    className={`banner-item ${this.setCardStatus(this.indexes, i)}`}
                    style={{ backgroundImage: `url(${getImgSrc(item.imageId)})` }}
                    onClick={() => {
                      clearInterval(this.timer)
                      this.timer = null
                      if (i <= 0) {
                        this.indexes = {
                          previousIndex: this.bannerData.length - 1,
                          currentIndex: 0,
                          nextIndex: 1,
                        }
                      } else {
                        this.indexes = {
                          previousIndex: i - 1 < 0 ? this.bannerData.length - 1 : i - 1,
                          currentIndex: i,
                          nextIndex: i + 1 > this.bannerData.length - 1 ? 0 : i + 1,
                        }
                      }
                      this.bannerStart()
                    }}
                  >
                    <span>{item.title}</span>
                    <span className="active-content-bottom">{item.content}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="home-highlight m-p2rem">
          <div className="FBV FBAC top-line">
            <LineTitle title={getModInfo(PAGE_MODULES, THIRD, 'title')} titleClass="subtitle-font" />
            <div className="FBAC-S sub-content">
              {getModInfo(PAGE_MODULES, THIRD, 'content')}
            </div>
          </div>
          <div className="highlight-detail" style={{gridTemplateColumns: `repeat(${grid}, ${percent})`}}>
            {highLights}
          </div>
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
        <div className="home-experience FBV" style={{ overflow: 'hidden' }}>
          <LineTitle title={getModInfo(PAGE_MODULES, SIXTH, 'title')} titleClass="subtitle-white" />
          <div className="FBAC-S sub-content m14">
            {getModInfo(PAGE_MODULES, SIXTH, 'content')}
          </div>
          <button
            type="button"
            className="common-btn FBAC-S"
            onClick={() => {
              const { history } = this.props
              history.push(getModInfo(PAGE_MODULES, SIXTH, 'buttonUrl') || '/cooperation')
            }}
          >
            {getModInfo(PAGE_MODULES, SIXTH, 'buttonTxt')}
          </button>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Home)
