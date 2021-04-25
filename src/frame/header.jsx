import FrameStore from './store-frame'
import React from 'react'
import cls from 'classnames'
import logoSrc from '../image/logo.png'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const store = new FrameStore()

@observer
class Header extends React.Component {
  @observable activeKey = '/home'
  componentDidMount () {
    const { pathname } = window.location
    this.activeKey = pathname
  }

  render () {
    const { history } = this.props
    const { menus } = store
    const menuItems = menus.map(item => {
      return (
        <li className="nav-item" key={item.url}>
          <span
            className={cls({
              'menu-item': true,
              active: item.url === this.activeKey,
            })}
            onClick={() => {
              history.push({
                pathname: item.url,
              })
              this.activeKey = item.url
            }}
          >
            {item.name}
          </span>
        </li>
      )
    })
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top header-dark FBH FBJC">
        <div className="nav-logo">
          <img src={logoSrc} alt="YashanDB" className="common-logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto FBH FBJB nav-menu">
            {menuItems}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
