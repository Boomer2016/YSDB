import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'

export default class HomeStore {
  // 被观察的属性
  @observable content = ''
  @observable productHighLights = [
    {name: '数据库峰值处理能力（万次/秒）', value: 6100, id: 1},
    {name: '可支持最大节点数量（台）', value: 1500, id: 2},
    {name: '其他数据库性能（万次/秒）', value: 3200, id: 3},
    {name: '其他数据库性能（万次/秒）', value: 5800, id: 4},
    {name: '其他数据库性能（万次/秒）', value: 6896, id: 5},
  ]

  @observable productAdvances = [
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 1},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 2},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 3},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 4},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 5},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 6},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 7},
    {name: '兼容并包', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 8},
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
