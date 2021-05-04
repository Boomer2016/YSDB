import { action, observable, runInAction } from 'mobx'

import io from '../common/io-common'
import { message } from 'antd'
import partnerSrc from '../image/partner.png'

export default class HomeStore {
  // 被观察的属性
  @observable headInfo = {}
  @observable bannerData = [
    {title: 'YashanDB', content: 'YashanDB职场加速器1', id: 1, index: 0},
    {title: 'YashanDB', content: 'YashanDB职场加速器2', id: 2, index: 1},
    {title: 'YashanDB', content: 'YashanDB职场加速器3', id: 3, index: 2},
    {title: 'YashanDB', content: 'YashanDB职场加速器4', id: 4, index: 3},
    {title: 'YashanDB', content: 'YashanDB职场加速器5', id: 5, index: 4},
  ]
  @observable productHighLights = [
    {name: '数据库峰值处理能力（万次/秒）', value: 6100, id: 1},
    {name: '可支持最大节点数量（台）', value: 1500, id: 2},
    {name: '其他数据库性能（万次/秒）', value: 3200, id: 3},
    {name: '其他数据库性能（万次/秒）', value: 5800, id: 4},
    {name: '其他数据库性能（万次/秒）', value: 6896, id: 5},
    // {name: '可支持最大节点数量（台）', value: 1500, id: 6},
    // {name: '其他数据库性能（万次/秒）', value: 3200, id: 7},
    // {name: '其他数据库性能（万次/秒）', value: 5800, id: 8},
    // {name: '其他数据库性能（万次/秒）', value: 6896, id: 9},
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

  @observable partners = [
    {id: 1, name: '林玉冰', department: '淘宝技术部基础交易', img: partnerSrc, content: '淘宝收藏夹服务集团内50+业务方，总体收藏关系数将近千亿，并发量数十万，非常好的支持了收藏夹的读写场景，经历了多次大促高并发考'},
    {id: 2, name: '黄柏强', department: '淘宝技术部基础交易', img: partnerSrc, content: '淘宝收藏夹服务集团内50+业务方，总体收藏关系数将近千亿，并发量数十万，非常好的支持了收藏夹的读写场景，经历了多次大促高并发考'},
    {id: 3, name: '李玉山', department: '淘宝技术部基础交易', img: partnerSrc, content: '淘宝收藏夹服务集团内50+业务方，总体收藏关系数将近千亿，并发量数十万，非常好的支持了收藏夹的读写场景，经历了多次大促高并发考'},
    {id: 4, name: '赵清华', department: '淘宝技术部基础交易', img: partnerSrc, content: '淘宝收藏夹服务集团内50+业务方，总体收藏关系数将近千亿，并发量数十万，非常好的支持了收藏夹的读写场景，经历了多次大促高并发考'},
  ]

  // 异步action示例
  @action async getPageInfo (id) {
    try {
      const res = await io.getPageInfo(id)
      console.log(res)
      runInAction(() => {
        this.headInfo = res
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
