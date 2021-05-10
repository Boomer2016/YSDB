import { Row, Col } from "antd"
import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import MODULE_CODE from './config'
import { getModInfo, getImgSrc } from '../common/util'
import { Link } from "react-router-dom"


@observer
class Cooperation extends Component {
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
    return (
      <div className="page-cooperation">
        <div className="cooperation-header FBV FBAC">
          <h1 className="cooperation-header-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="cooperation-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button type="button" className="common-btn">
            <Link to={getModInfo(PAGE_MODULES, FIRST, 'buttonUrl')}>
              {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
            </Link>
          </button>
        </div>
        <div className="contact-area m-p2rem">
          <Row justify="space-between">
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
              className="FBV FBAC leftBg"
            >
              <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} />
              <span className="mini-font m10">
                {getModInfo(PAGE_MODULES, SECOND, 'content')}
              </span>
              <img src={getImgSrc(getModInfo(PAGE_MODULES, SECOND, 'imageId'))} alt="二维码" className="qr-cord" />
            </Col>
            <Col
              xs={23}
              sm={23}
              md={11}
              lg={11}
              xl={11}
              className="FBV"
            >
              <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, THIRD, 'title')} />
              <span className="mini-font m10">
                {getModInfo(PAGE_MODULES, THIRD, 'content')}
              </span>
              {getModInfo(PAGE_MODULES, THIRD, 'subList').map(item => (
                <div key={item.code} className="mt14">
                  <span className="contact-name">{item.title}</span>
                  <span className="contact-value">{item.content}</span>
                </div>
              ))}
            </Col>
          </Row>
        </div>
        <div className="FBV FBAC">
          <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, FOURTH, 'title')} />
          <span className="mini-font m10">
            {getModInfo(PAGE_MODULES, FOURTH, 'content')}
          </span>
        </div>
      </div>
    )
  }
}

export default inject('CommonStore')(Cooperation)
