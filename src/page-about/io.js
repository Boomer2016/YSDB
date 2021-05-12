import IoContext, { BASE_PATH } from '../common/io-context'

const io = new IoContext()

const ioAbout = {
  getNews: (data, config = {}) => {
    return io.request({
      ...config,
      data,
      url: `${BASE_PATH}/News/top`,
      method: 'GET',
    })
  },
}

export default ioAbout
