import "babel-polyfill"

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import CommonStore from './common/store-common'
import Frame from './frame'
import Home from './page-home'
import Product from './page-product'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDom from 'react-dom'

require('es6-symbol/implement')

const store = new CommonStore()
export default class Entry extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Frame>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product-system" component={Product} />
              <Redirect exact from="/" to="/home" />
            </Switch>
          </Frame>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <Provider store={store}>
    <Entry />
  </Provider>,
  document.getElementById('root')
)
