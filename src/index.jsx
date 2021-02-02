import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Frame from './frame'
import Home from './page-home'
import React from 'react'
import ReactDom from 'react-dom'

export default class Entry extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Frame>
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect exact from="/" to="/home" />
            </Switch>
          </Frame>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(<Entry />, document.getElementById('root'))
