import { Row, Col } from "antd"
import React, { Component } from "react"
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import MODULE_CODE from './config'
import Slider from "react-slick"
import { getModInfo, getImgSrc } from '../common/util'
import { Link } from "react-router-dom"

@observer
class Customer extends Component {
  slider = React.createRef()

  componentWillMount() {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore } = this.props
    CommonStore.getPageInfo(CommonStore.ACTIVE_PAGE.id)
  }

  render () {
    const { CommonStore: {PAGE_MODULES = []} } = this.props
    const { FIRST, SECOND, THIRD, FOURTH } = MODULE_CODE
    const settings = {
      className: "case-slider",
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      rtl: true,
      ref: this.slider,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
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
    const caseItems = getModInfo(PAGE_MODULES, SECOND, 'subList').map(item => (
      <div className="case-item" key={item.code}>
        <div className="FBH case-content">
          <div className="case-item-title">{item.title}</div>
          <span className="mini-font FB1">{item.content}</span>
        </div>
      </div>
    ))
    const painPointsItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map(item => (
      <Col
        className="FBV earn-item"
        xs={24}
        sm={24}
        md={12}
        lg={7}
        xl={7}
        key={item.code}
      >
        <span className="pt10 pl20">{item.title}</span>
        <span className="mini-font mt8 pl20 pr20">{item.content}</span>
      </Col>
    ))
    return (
      <div className="page-customer">
        <div className="customer-header FBV FBAC">
          <h1 className="customer-header-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="customer-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button type="button" className="common-btn">
            <Link to={getModInfo(PAGE_MODULES, FIRST, 'buttonUrl')}>
              {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
            </Link>
          </button>
        </div>
        <div className="case-desc FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} />
            <div className="mini-font mt10 fac">
              {getModInfo(PAGE_MODULES, SECOND, 'content')}
            </div>
          </div>
          <div className="FBH FBAC FBJB">
            <LeftOutlined onClick={() => this.slider.current.slickPrev()} className="left-icon" />
            <Slider {...settings}>
              {caseItems}
            </Slider>
            <RightOutlined className="right-icon" onClick={() => this.slider.current.slickNext()} />
          </div>
        </div>
        <div className="solution-area FBV FBAC">
          <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, THIRD, 'title')} />
          <div className="mini-font mt10 fac">
            {getModInfo(PAGE_MODULES, THIRD, 'content')}
          </div>
          <img src={getImgSrc(getModInfo(PAGE_MODULES, THIRD, 'imageId'))} alt="解决方案" className="solution-src" />
        </div>
        <div className="customer-earns FBV FBAC m-p2rem">
          <div className="subBg">
            <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, FOURTH, 'title')} />
            <div className="mini-font mt10 fac">
              {getModInfo(PAGE_MODULES, FOURTH, 'content')}
            </div>
          </div>
          <Row justify="space-between" className="earn-row">{painPointsItems}</Row>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Customer)
