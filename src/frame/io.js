import ioContext, { BASE_PATH } from '../common/io-context'

const IoFrame = {
  getBannerImgs: (data, config = {}) => {
    return ioContext.request({
      ...config,
      data,
      url: `${BASE_PATH}/v1/api/getBannerImgs`,
      method: 'POST',
    })
  },
}

export default IoFrame
