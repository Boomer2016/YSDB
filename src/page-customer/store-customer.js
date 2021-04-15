import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'

export default class CustomerStore {
  // 被观察的属性
  @observable content = ''
  @observable caseDescs = [
    {name: '案例1', value: '这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文', id: 1},
    {name: '案例2', value: '这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文案，这里应该补充案例描述文', id: 2},
  ]

  @observable customerEarns = [
    {name: '收益1', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 1},
    {name: '收益2', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 2},
    {name: '收益3', value: '支持 MySQL 到 OceanBase MySQL 的结构迁移、全量迁移和增量。', id: 3},
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
