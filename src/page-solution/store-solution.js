import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'
import archPic from '../image/productarch.png'

export default class SolutionStore {
  // 被观察的属性
  @observable content = ''
  @observable painPoints = [
    {name: '痛点1', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 1},
    {name: '痛点2', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 2},
    {name: '痛点3', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 3},
  ]
  @observable advantages = [
    {name: '优势1', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 1},
    {name: '优势2', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 2},
    {name: '优势3', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 3},
    {name: '优势4', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 4},
  ]

  @observable solutions = [
    {name: '淘宝', src: archPic, content: 'YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度', id: 1},
    {name: '支付宝', src: archPic, content: 'YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度', id: 2},
    {name: '中国银行', src: archPic, content: 'YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度', id: 3},
    {name: '招商银行', src: archPic, content: 'YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调YashanDB 迁移服务连接的两端分别是待迁移的源业务数据库以及目标端 YashanDB 数据库，内部主要包含一站式迁移调度', id: 4},
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
