import { Button, Modal, Row, Col } from 'antd'
import React, { Component } from "react"
import { action, observable } from "mobx"

import AboutStore from "./store-about"
import { observer } from "mobx-react"
import aboutCompSrc from "../image/about-comp.png"
import LineTitle from '../component/line-title'

const store = new AboutStore()

@observer
export default class About extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    const newsItems = store.content.map(item => (
      <div className="FBV news-item">
        <span>{item.title}</span>
        <span className="news-content">{item.content}</span>
        <div className="FBH news-bottom">
          <span className="mr8">
            发布于
            {item.time}
          </span>
          <span>
            {item.counts}
            浏览
          </span>
        </div>
      </div>
    ))
    return (
      <div className="page-about">
        <div className="about-header FBV FBAC">
          <h1 className="about-header-title">关于我们</h1>
          <div className="about-header-content mini-font">
          欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,
          欢迎联系我们洽谈合作,欢迎联系我们洽谈合作,欢迎联系我们洽谈
          </div>
          <button type="button" className="common-btn">了解更多</button>
        </div>
        <div className="about-content m-p2rem">
          <Row justify="space-between">
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
              className="FBV FBAC"
            >
              <div className="leftBg">
                <LineTitle titleClass="subtitle-font" title="公司风采" />
                <img src={aboutCompSrc} alt="公司" className="comp-src" />
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
            >
              <LineTitle titleClass="subtitle-font" title="媒体报道" />
              {newsItems}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
