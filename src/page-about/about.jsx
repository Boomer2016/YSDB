import { Col, List, Row } from 'antd'
import React, { Component } from "react"
import { getImgSrc, getModInfo } from '../common/util'
import { inject, observer } from "mobx-react"

import AboutStore from "./store-about"
import LineTitle from '../component/line-title'
import { Link } from "react-router-dom"
import MODULE_CODE from './config'
import { toJS } from 'mobx'

const store = new AboutStore()

@inject('CommonStore')
@observer
export default class About extends Component {
  componentWillMount () {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore, location: { pathname } } = this.props
    const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
    CommonStore.getPageInfo(activeItem.id)
    store.getNews()
  }

  render () {
    const { CommonStore: { PAGE_MODULES = [], setActivePage } } = this.props
    const { FIRST, SECOND, THIRD } = MODULE_CODE
    return (
      <div className="page-about">
        <div className="about-header FBV FBAC">
          <h1 className="about-header-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h1>
          <div className="about-header-content mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </div>
          <button
            type="button"
            className="common-btn"
            onClick={() => {
              setActivePage({})
            }}
          >
            <Link to={getModInfo(PAGE_MODULES, FIRST, 'buttonUrl') || '/cooperation'}>
              {getModInfo(PAGE_MODULES, FIRST, 'buttonTxt')}
            </Link>
          </button>
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
                <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, SECOND, 'title')} />
                <img src={getImgSrc(getModInfo(PAGE_MODULES, SECOND, 'imageId'))} alt="公司" className="comp-src mt20" />
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              lg={11}
              xl={11}
            >
              <LineTitle titleClass="subtitle-font" title={getModInfo(PAGE_MODULES, THIRD, 'title')} />
              <List
                className="mt20"
                itemLayout="horizontal"
                dataSource={store.news}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                      description={item.summary}
                    />
                  </List.Item>
                )}
                pagination={{
                  total: store.news.length,
                  pageSize: 3,
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
