import React from 'react'
import logoSrc from '../image/logo.png'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'

@observer
class Header extends React.Component {
  @observable activeKey = ['/home']
  componentDidMount () {
    const { pathname } = window.location
    this.activeKey = [pathname]
  }

  @action
  menuClick = key => {
    const { history, CommonStore: { menus } } = this.props
    let pageMenus = []
    toJS(menus).forEach(item => {
      if (item.subList && item.subList.length) {
        pageMenus = pageMenus.concat(
          item.subList.map(k => (
            {
              ...k,
              orignUrl: item.url,
              parent: false,
            }))
        )
      } else {
        pageMenus.push({ ...item, orignUrl: item.url, parent: true })
      }
    })
    const activeItem = pageMenus.find(item => item.url === key)
    history.push({
      pathname: activeItem.orignUrl,
      search: activeItem.parent ? '' : `id=${activeItem.id}`,
    })
    this.activeKey = [key]
  }

  render () {
    const { CommonStore: { menus } } = this.props
    const navItems = menus.map(item => (
      <React.Fragment key={item.id}>
        {item.subList.length ? (
          <Menu.SubMenu title={item.name}>
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
    const cellphoneNavItems = menus.map(item => (
      <React.Fragment key={item.id}>
        {item.subList.length ? (
          <Menu.ItemGroup title={item.name}>
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
          onClick={e => this.menuClick(e.key)}
          className="nav-menu"
        >
          {navItems}
        </Menu>
        <div className="header-action FBH FBJE FBAC">
          <Dropdown
            overlay={(
              <Menu
                className="cellphone-nav-menu"
                onClick={e => this.menuClick(e.key)}
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
