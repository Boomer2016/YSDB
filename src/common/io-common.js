import IoContext, { BASE_PATH } from './io-context'

const io = new IoContext()

const ioFrame = {
  getMainNavs: (data, config = {}) => {
    return io.request({
      ...config,
      data,
      url: `${BASE_PATH}/Nav/Mains`,
      method: 'GET',
    })
  },
  getFooterNavs: (data, config = {}) => {
    return io.request({
      ...config,
      data,
      url: `${BASE_PATH}/Nav/Footers`,
      method: 'GET',
    })
  },
  getPageInfo: id => {
    return io.request({
      data: {},
      url: `${BASE_PATH}/Module/${id}`,
      method: 'GET',
    })
  },
}

export default ioFrame
