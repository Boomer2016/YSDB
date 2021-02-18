import { action, configure, observable, runInAction } from 'mobx'

// import io from './io'
// import { message } from 'antd'

configure({ isolateGlobalState: true })
export default class CommonStore {
  // 被观察的属性
  @observable content = 'commonContent'

  // 异步action示例
  // @action async getContent () {
  //   try {
  //     const res = await io.getContent({
  //       param: '1',
  //     })
  //     runInAction(() => {
  //       this.content = res.story
  //     })
  //   } catch (e) {
  //     message.error(e.message)
  //   }
  // }

  // 更新action示例
  @action clearContent () {
    this.content = ''
  }
}
