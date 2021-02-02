import axios from 'axios'

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

const request = axios.create({
  timeout: 300 * 1000,
})

request.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      try {
        if (config.headers['Content-Type'] === 'application/json') {
          config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }
      } catch (error) {
        console.log(error)
      }
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        // sessionID,
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)


/**
 *  暂定后端正常返回结构为 { hasError: boolean; data: object; errorDesc: string; errorId: string}
 */

let rid = 0

request.interceptors.response.use(
  response => {
    const { hasError, data, errorDesc } = response.data || {};
    rid += 1
    response.data = {
      hasError: hasError || false,
      data: data || {},
      errorDesc: errorDesc || '',
      rid,
    }
    // if (errorDesc === 'SESSION_EXPIRED' || errorDesc === 'SESSION_NOTFOUND') {
    //   window.location.href = '/login';
    // }
    return response
  },
  error => {
    const { response } = error
    let errorDesc = ''
    if (response) {
      const { status } = response
      errorDesc = codeMsgMap[status]
    }
    rid += 1
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ hasError: true, data: {}, errorDesc, rid })
  },
)

export const BASE_PATH = 'https://192.168.1.21:9999/'
export default request
