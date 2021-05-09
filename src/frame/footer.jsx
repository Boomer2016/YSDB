import { Col, Row } from 'antd'

import React from 'react'
import logoSrc from '../image/logo.png'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'


@observer
class Footer extends React.Component {
  render () {
    const { history, CommonStore } = this.props
    const linkItems = CommonStore.FOOTER_LINKS.map((item, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Col key={i} xs={8} sm={8} md={4} lg={4} xl={4} className="FBV">
        <div className="link-item">{item.groupName}</div>
        <div className="FB1 FBV mt6">
          {(item.navList || []).map(k => (
            <a key={k.name} className="pt8 link-name">
              {k.name}
            </a>
          ))}
        </div>
      </Col>
    ))
    return (
      <div className="frame-footer FBV">
        <Row className="footer-main">
          <Col className="footer-logo" xs={24} sm={24} md={24} lg={8} xl={8}>
            <img src={logoSrc} alt="YashanDB" className="common-logo" />
          </Col>
          <Col className="footer-link" xs={24} sm={24} md={16} lg={16} xl={16}>
            <Row gutter={16}>
              {linkItems}
            </Row>
          </Col>
        </Row>
        <Row className="footer-address" gutter={8}>
          <Col xs={24} sm={24} md={24} lg={5} xl={5}>总部：深圳计算科学研究院</Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>地址：深圳市龙华区科技创新中心26座10层</Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Footer)
