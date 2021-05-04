import axios from 'axios'

export const BASE_PATH = '/web'

const codeMsgMap = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

class IoContext {
  request (params) {
    return new Promise((resolve, reject) => {
      const { method, data, url, config } = params
      // 处理GET POST的请求参数
      // `params` 是即将与请求一起发送的 URL 参数 必须是一个无格式对象(plain object)或 URLSearchParams 对象
      // `data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
      const reqPrams = ['POST', 'PUT', 'PATCH'].includes(method) ? { data } : { params: data }
      axios({
        method,
        url,
        ...reqPrams,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          ...config,
        },
        // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
        // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
        validateStatus: status => {
          if (status >= 400) {
            const err = { message: codeMsgMap[status] }
            reject(err)
          }
          return status < 400
        },
      })
        .then(res => {
          // 请求成功后只将data传递下去，code不为0的时候将整个错误体传递下去
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else if (res.headers['content-type'] !== 'application/json; charset=utf-8') {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch(err => {
          reject(err.message)
        })
    })
  }
}

export default IoContext
