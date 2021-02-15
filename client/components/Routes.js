import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import ProtectedRoute from './ProtectedRoute.js'

import App from './App'
import Home from './Home'
import UserAccountPage from './UserAccountPage'

export class Routes extends Component {
  render() {
    return (
      <AnimatePresence>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sesh" component={App} />
            <ProtectedRoute
              path="/solo"
              component={() => {
                return <App singleSession={true} />
              }}
            />
            <Route path="/studio" component={UserAccountPage} />
          </Switch>
        </Router>
      </AnimatePresence>
    )
  }
}

export default Routes
