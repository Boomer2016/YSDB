import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'

export default class FrameStore {
  // 被观察的属性
  @observable menus = [
    {name: '首页', key: 'page1', color: '#55acee', url: '/home'},
    {name: '产品体系', key: 'page2', color: 'magenta', url: '/product-system'},
    {name: '解决方案', key: 'page3', color: 'blue', url: '/solution'},
    {name: '客户案例', key: 'page4', color: 'orange', url: '/customer-case'},
    {name: '合作生态', key: 'page5', color: 'cyan', url: '/cooperation-ecological'},
    {name: '文档中心', key: 'page6', color: 'geekblue', url: '/doc-center'},
    {name: '关于我们', key: 'page7', color: 'gold', url: '/about-us'},
  ]

  @observable footerLinks = [
    {
      name: '产品',
      key: 'product',
      links: [
        {name: '数据库1', url: './db1'},
        {name: '数据库2', url: './db2'},
      ],
    },
    {
      name: '案例',
      key: 'case',
      links: [
        {name: '案例1', url: './case1'},
        {name: '案例2', url: './case2'},
      ],
    },
    {
      name: '文档',
      key: 'doc',
      links: [
        {name: '快捷入门', url: './doc1'},
        {name: '产品白皮书', url: './doc2'},
        {name: '用户手册', url: './doc3'},
      ],
    },
    {
      name: '合作',
      key: 'composition',
      links: [
        {name: '淘宝网', url: './db1'},
        {name: '招商银行', url: './db2'},
      ],
    },
    {
      name: '关于',
      key: 'about',
      links: [
        {name: '最新动态', url: './db1'},
        {name: '新闻', url: './db2'},
        {name: '联系我们', url: './db2'},
      ],
    },
  ]

  // 异步action示例
  @action async getContent () {
    try {
      const res = await io.getContent({
        param: '1',
      })
      runInAction(() => {
        this.content = res.story
      })
    } catch (e) {
      message.error(e.message)
    }
  }

  // 更新action示例
  @action clearContent () {
    this.content = ''
  }
}
