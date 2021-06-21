import "babel-polyfill"

import { Redirect, Route, Router, Switch } from 'react-router-dom'

import About from './page-about'
import CommonStore from './common/store-common'
import Cooperation from './page-cooperation'
import Customer from './page-customer'
import Documents from './page-documents'
import Frame from './frame'
import Home from './page-home'
import NotFound from './page-not-found'
import Product from './page-product'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDom from 'react-dom'
import Solution from './page-solution'
import { createBrowserHistory } from 'history'

require('es6-symbol/implement')

const history = createBrowserHistory()

history.listen(location => {
  setTimeout(() => {
    if (location.action === 'POP') return
    const ele = document.getElementById('main')
    if (ele) ele.scrollTop = 0
  }, 0)
})

export default class Entry extends React.Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
          <Frame>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product" component={Product} />
              <Route path="/solution" component={Solution} />
              <Route path="/customers" component={Customer} />
              <Route path="/cooperation" component={Cooperation} />
              <Route path="/documents" component={Documents} />
              <Route path="/aboutus" component={About} />
              <Redirect exact from="/" to="/home" />
              <Route component={NotFound} />
            </Switch>
          </Frame>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <Provider CommonStore={CommonStore}>
    <Entry />
  </Provider>,
  document.getElementById('root')
)
