import {asyncComponent} from '../common/util'
import './not-found.styl'


export default asyncComponent(async () => {
  try {
    const module = await import('./not-found')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
