import { Dropdown, Menu } from 'antd'
import { action, observable, toJS } from 'mobx'

import React from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import logoSrc from '../image/logo.jpg'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const initKey = localStorage.getItem('activeKey') || '/home'
@observer
class Header extends React.Component {
  @observable activeKey = [initKey]

  componentDidUpdate(preProps) {
    const {location: {pathname, search}, CommonStore} = this.props
    if (pathname !== preProps.location.pathname && !search) {
      this.activeKey = [pathname]
    } else if (pathname !== preProps.location.pathname && search) {
      const pageId = search.split('=') && search.split('=')[1]
      const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
      const activeSubItem = (activeItem.subList || []).find(item => +item.id === +pageId)
      this.activeKey = activeSubItem ? [activeSubItem.url] : []
    }
  }

  @action
  menuClick = e => {
    const { history, CommonStore } = this.props
    const splitKeys = e.key.split('/')
    // CommonStore.setPageModules([])
    if (splitKeys.length === 3) {
      const activeItem = CommonStore.PAGES.find(item => item.url.includes(splitKeys[1]))
      const activeSubItem = (activeItem.subList || []).find(item => item.url === e.key)
      CommonStore.setActivePage(activeSubItem)
      history.push({
        pathname: activeItem.url,
        search: `id=${activeSubItem.id}`,
      })
    } else if (splitKeys.length === 2) {
      const activePage = CommonStore.PAGES.find(item => item.url === e.key)
      history.push({
        pathname: activePage.url,
      })
      CommonStore.setActivePage(activePage)
    }
    this.activeKey = [e.key]
    localStorage.setItem('activeKey', e.key)
  }

  render () {
    const { CommonStore } = this.props
    const navItems = CommonStore.PAGES.map(item => (
      <React.Fragment key={item.id}>
        {item.subList.length ? (
          <Menu.SubMenu title={item.name} key={item.url}>
            {item.subList.map(k => (
              <Menu.Item key={k.url}>
                <span className="menu-item-name">
                  {k.name}
                </span>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.url}>
            <span className="menu-item-name">
              {item.name}
            </span>
          </Menu.Item>
        )}
      </React.Fragment>
    ))
    const cellphoneNavItems = CommonStore.PAGES.map(item => (
      <React.Fragment key={item.id}>
        {item.subList.length ? (
          <Menu.ItemGroup title={item.name} key={item.url}>
            {item.subList.map(k => (
              <Menu.Item key={k.url}>
                <span className="menu-item-name">
                  {k.name}
                </span>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={item.url}>
            <span className="menu-item-name">
              {item.name}
            </span>
          </Menu.Item>
        )}
      </React.Fragment>
    ))
    return (
      <nav className="header-dark FBH FBAC">
        <div className="nav-logo">
          <img src={logoSrc} alt="YashanDB" className="common-logo" />
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={toJS(this.activeKey)}
          theme="dark"
          onClick={e => this.menuClick(e)}
          className="nav-menu"
        >
          {navItems}
        </Menu>
        <div className="header-action FBH FBJE FBAC">
          <Dropdown
            overlay={(
              <Menu
                className="cellphone-nav-menu"
                onClick={e => this.menuClick(e)}
                selectedKeys={toJS(this.activeKey)}
              >
                {cellphoneNavItems}
              </Menu>
            )}
          >
            <UnorderedListOutlined className="action-icon" />
          </Dropdown>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
