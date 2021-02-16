import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {auth} from '../Firebase.js'

export class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const Component = this.props.component
    console.log('component-->', Component)
    const isAuthenticated = auth.currentUser
    console.log('are you logged in?-->', auth.currentUser)

    //   return  ?  :
    if (isAuthenticated) {
      return <Component />
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, null)(ProtectedRoute)
