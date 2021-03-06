import { Avatar, Col, Row } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Component } from "react"
import { getImgSrc, getModInfo } from '../common/util'
import { inject, observer } from "mobx-react"

import LineTitle from '../component/line-title'
import MODULE_CODE from './config'
import Slider from "react-slick"

@observer
class Solution extends Component {
  slider = React.createRef()

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
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = MODULE_CODE
    const painPointsItems = getModInfo(PAGE_MODULES, SECOND, 'subList').map((item, i) => (
      <Col
        className={`${(i + 1) % 3 ? 'right-border' : ''}`}
        xs={24}
        sm={24}
        md={8}
        lg={8}
        xl={8}
        key={item.code}
      >
        <div className="FBV pain-item">
          <span className="pain-item-title">{item.title}</span>
          <span className="mini-font pain-item-content">{item.content}</span>
        </div>
      </Col>
    ))
    const advantageItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map(item => (
      <Col
        xs={22}
        sm={22}
        md={22}
        lg={4}
        xl={4}
        key={item.code}
      >
        <div className="FBV FBAC">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={getImgSrc(item.imageId)}
          />
          <span className="fac p10">{item.title}</span>
          <span className="mini-font fac">{item.content}</span>
        </div>
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
      ref: this.slider,
    }
    const solutionItems = getModInfo(PAGE_MODULES, FIFTH, 'subList').map(item => (
      <div className="case-main" key={item.code}>
        <div className="subBg">
          <LineTitle titleClass="subtitle-font" title={item.title} />
        </div>
        <div className="solotion-item-content">
          <div className="case-pic">
            <img src={getImgSrc(item.imageId)} alt={item.content} />
          </div>
          <div className="FBV case-content">
            <span className="mini-font">
              {item.content}
            </span>
            <button
              type="button"
              className="common-btn"
              onClick={() => {
                const { history } = this.props
                history.push(item.buttonUrl || '/cooperation')
              }}
            >
              {item.buttonTxt}
            </button>
          </div>
        </div>
      </div>
    ))
    return (
      <div className="page-solution">
        <div className="solution-header FBV FBAC FBJC">
          <h1 className="solution-header-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="solution-header-content mini-font">
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
        </div>
        <div className="pain-points FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} />
            <div className="solution-header-content mini-font mt10 fac">
              {getModInfo(PAGE_MODULES, SECOND, 'content')}
            </div>
          </div>
          <Row className="points-row">{painPointsItems}</Row>
        </div>
        <Row justify="space-between" className="solution-area">
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={12}
            lg={10}
            xl={10}
            className="solution-pic"
          >
            <img src={getImgSrc(getModInfo(PAGE_MODULES, THIRD, 'imageId'))} alt="解决方案" />
          </Col>
          <Col
            className="FBV"
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={12}
            lg={12}
            xl={12}
          >
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, THIRD, 'title')} />
            <pre className="p10 mini-font">
              {getModInfo(PAGE_MODULES, THIRD, 'content')}
            </pre>
          </Col>
        </Row>
        <div className="advantage-bg">
          <div className="advantage-area FBV m-p2rem">
            <div className="subBg FBV FBAC">
              <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, FOURTH, 'title')} />
              <div className="solution-header-content mini-font mt10">
                {getModInfo(PAGE_MODULES, FOURTH, 'content')}
              </div>
            </div>
            <Row className="pt20" justify="space-between">{advantageItems}</Row>
          </div>
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
