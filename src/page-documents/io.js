import IoContext, { BASE_PATH } from '../common/io-context'

const io = new IoContext()
const ioDocuments = {
  getDocTree: (data, config = {}) => {
    return io.request({
      ...config,
      data,
      url: `${BASE_PATH}/Doc/List`,
      method: 'GET',
    })
  },
}

export default ioDocuments
