import "babel-polyfill"

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import CommonStore from './common/store-common'
import Frame from './frame'
import Home from './page-home'
import Product from './page-product'
import Documents from './page-documents'
import Solution from './page-solution'
import Customer from './page-customer'
import Cooperation from './page-cooperation'
import NotFound from './page-not-found'
import About from './page-about'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDom from 'react-dom'

require('es6-symbol/implement')

export default class Entry extends React.Component {
  render () {
    return (
      <Router>
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
              <Route component={NotFound} />
              <Redirect exact from="/" to="/home" />
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
