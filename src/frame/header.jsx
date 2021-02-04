import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const menus = [
  {
    menuName: '关于YSDB',
    menuKey: 'aboutGE',
    menuPath: './about',
  },
  {
    menuName: '产品中心',
    menuKey: 'productCenter',
    menuPath: './about',
  },
  {
    menuName: '应用领域',
    menuKey: 'appArea',
    menuPath: './about',
  },
  {
    menuName: '客户服务',
    menuKey: 'customerService',
    menuPath: './about',
  },
  {
    menuName: '新闻中心',
    menuKey: 'newsCenter',
    menuPath: './about',
  },
  {
    menuName: '联系我们',
    menuKey: 'contactUs',
    menuPath: './about',
  },
]

@observer
class Header extends React.Component {
  @observable activeKey = 'aboutGE'
  render () {
    const { history } = this.props
    // const menuItem = menus.map(item => {
    //   return (
    //     <span
    //       key={item.menuKey}
    //       className={cls({ "mr40 menu-item": true, active: this.activeKey === item.menuKey })}
    //       onClick={() => {
    //         this.activeKey = item.menuKey
    //         history.push(item.menuPath)
    //       }}
    //     >
    //       {item.menuName}
    //     </span>
    //   )
    // })
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">Fixed navbar</a>
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
