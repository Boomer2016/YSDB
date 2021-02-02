import './home.styl'

import { asyncComponent } from '../common/util'

export default asyncComponent(async () => {
  try {
    const module = await import('./home')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
