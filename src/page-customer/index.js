import './customer.styl'

import { asyncComponent } from '../common/util'

export default asyncComponent(async () => {
  try {
    const module = await import('./customer')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
