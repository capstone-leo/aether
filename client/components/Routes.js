import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import {auth} from '../Firebase'

import App from './App'
import Home from './Home'
import UserAccountPage from './UserAccountPage'

class Routes extends Component {
  render() {
    return (
      <AnimatePresence>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/sesh" component={App} />
          <Route
            path="/solo"
            render={() => {
              return <App singleSession={true} />
            }}
          />
          <Route path="/studio" component={UserAccountPage} />
        </Router>
      </AnimatePresence>
    )
  }
}

export default Routes
