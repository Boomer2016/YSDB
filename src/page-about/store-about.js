import { action, observable, runInAction } from 'mobx'

import io from './io'
import { message } from 'antd'

export default class AboutStore {
  // 被观察的属性
  @observable content = [
    {
      id: 1,
      title: '新起点，深圳计算机研究院正式入驻龙华',
      content: '深圳市科创委主任梁永生，龙华区副区长陈建民，深大副校长徐晨，深圳计算科学研究院的首席科学家樊文飞院士、名誉院长陈国良院士等参加',
      time: '2020-10-30',
      counts: 159,
    },
    {
      id: 2,
      title: '新起点，深圳计算机研究院正式入驻龙华',
      content: '深圳市科创委主任梁永生，龙华区副区长陈建民，深大副校长徐晨，深圳计算科学研究院的首席科学家樊文飞院士、名誉院长陈国良院士等参加',
      time: '2020-10-30',
      counts: 159,
    },
    {
      id: 3,
      title: '新起点，深圳计算机研究院正式入驻龙华',
      content: '深圳市科创委主任梁永生，龙华区副区长陈建民，深大副校长徐晨，深圳计算科学研究院的首席科学家樊文飞院士、名誉院长陈国良院士等参加',
      time: '2020-10-30',
      counts: 159,
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
