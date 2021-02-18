import React from 'react'
import {auth} from '../Firebase'
import firebase from 'firebase/app'

const SignIn = (props) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    //instatiate new auth token
    auth.signInWithRedirect(provider)
    //prompts redirect to and back from google login
  }

  return (
    <button
      className={
        props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
      }
      onClick={signInWithGoogle}
    >
      sign in with google
    </button>
  )
}
export default SignIn
