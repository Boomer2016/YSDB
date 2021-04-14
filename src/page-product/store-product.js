import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'
import scene1 from '../image/scene1.png'
import scene2 from '../image/scene2.png'
import scene3 from '../image/scene3.png'
import scene4 from '../image/scene4.png'


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

  @observable servicePowers = [
    {name: '服务能力1', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 1},
    {name: '服务能力2', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 2},
    {name: '服务能力3', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 3},
    {name: '服务能力4', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 4},
    {name: '服务能力5', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 5},
    {name: '服务能力6', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 6},
  ]
  @observable productScenes = [
    {name: '场景分类1', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', src: scene1, url: './', id: 1},
    {name: '场景分类2', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', src: scene2, url: './', id: 2},
    {name: '场景分类3', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', src: scene3, url: './', id: 3},
    {name: '场景分类4', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', src: scene4, url: './', id: 4},
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
