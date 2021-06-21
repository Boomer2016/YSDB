import { Row, Col } from "antd"
import React, { Component } from "react"
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import MODULE_CODE from './config'
import Slider from "react-slick"
import { getModInfo, getImgSrc } from '../common/util'

@observer
class Customer extends Component {
  slider = React.createRef()

  componentWillMount() {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore, location: {pathname, search} } = this.props
    if (search) {
      const pageId = search.split('=') && search.split('=')[1]
      CommonStore.getPageInfo(pageId)
    } else {
      const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
      CommonStore.getPageInfo(activeItem.id)
    }
  }

  render () {
    const { CommonStore: {PAGE_MODULES = []} } = this.props
    const { FIRST, SECOND, THIRD, FOURTH } = MODULE_CODE
    const settings = {
      className: "case-slider",
      dots: false,
      infinite: true,
      slidesToShow: getModInfo(PAGE_MODULES, SECOND, 'subList').length < 2 ? 1 : 2,
      slidesToScroll: 1,
      // adaptiveHeight: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
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
        <div className="case-item-title">{item.title}</div>
        <div className="case-content" style={{fontSize: '0.9rem'}}>{item.content}</div>
      </div>
    ))
    const painPointsItems = getModInfo(PAGE_MODULES, FOURTH, 'subList').map((item, i) => (
      <Col
        className={`FBV earn-item ${(i + 1) % 3 ? 'right-border' : ''}`}
        xs={24}
        sm={24}
        md={12}
        lg={7}
        xl={7}
        key={item.code}
      >
        <span className="pt10 pl20">{item.title}</span>
        <div className="mini-font mt8 pl20 pr20">{item.content}</div>
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
