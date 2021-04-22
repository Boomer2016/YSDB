import { Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import LineTitle from '../component/line-title'
import qrcordSrc from '../image/qr-cord.png'

import CooperationStore from "./store-cooperation"

const store = new CooperationStore()

@observer
class Cooperation extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    return (
      <div className="page-cooperation">
        <div className="cooperation-header FBV FBAC">
          <h1 className="cooperation-header-title">联系我们</h1>
          <div className="cooperation-header-content mini-font">
          欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,
          欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,欢迎联系我们洽谈
          </div>
          <button type="button" className="common-btn">了解更多</button>
        </div>
        <div className="contact-area">
          <Row justify="space-between">
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
              className="FBV FBAC"
            >
              <LineTitle titleClass="subtitle-font" title="微信公众号" />
              <span className="mini-font m10">
                欢迎扫码关注我们公众号，公众号简介内容文案，公众号简介内容文案，
                公众号简介内容文案，公众号简介内容文案。
              </span>
              <img src={qrcordSrc} alt="二维码" className="qr-cord" />
            </Col>
            <Col
              xs={23}
              sm={23}
              md={11}
              lg={11}
              xl={11}
              className="FBV"
            >
              <LineTitle titleClass="subtitle-font" title="联系方式" />
              <span className="mini-font m10">
                欢迎联系我们，欢迎联系我们，欢迎联系我们，
                欢迎联系我们，欢迎联系我们。
              </span>
              <span className="contact-name">电话</span>
              <span className="contact-value">189-1356-0000</span>
              <span className="contact-name">邮箱</span>
              <span className="contact-value">8888@gmail.com</span>
            </Col>
          </Row>
        </div>
        <div className="FBV FBAC">
          <LineTitle titleClass="subtitle-font" title="我们在哪" />
          <span className="mini-font m10">
            补充地图信息，补充地图信息，补充地图信息，补充地图信息，补充地图信息，补充地图信息
          </span>
        </div>
      </div>
    )
  }
}

export default inject('store')(Cooperation)
