import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'

import Loading from './Loading'
import SignIn from './SignIn'
import SignOut from './SignOut'
import BackgroundParticles from './Particles.js'
import {motion} from 'framer-motion'
import {Frame, Color} from 'framer'

import 'firebase/firestore'
import {auth} from '../Firebase'

import {connect} from 'react-redux'
import {setNewUser, signOutUser} from '../reducer/user'

const container = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1.3,
      staggerChildren: 1.1,
    },
  },
}
const item = {
  hidden: {opacity: 0, y: -20},
  show: {opacity: 1, y: 0},
}
const style = {
  textAlign: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: 'transparent' + '!important',
}

// Main Component
const Home = (props) => {
  // React Hooks
  const [user, loading, error] = useAuthState(auth) //user JSON
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    props.setNewUser(user)
  }, [user])
  const [enableOutline, setEnableOutline] = useState(false)
  // const [redirectTo, setRedirectTo] = useState('')

  // Accessibility Handler
  const handleKeydown = (e) => {
    const isTabEvent = e.keyCode === 9
    if (isTabEvent) {
      setEnableOutline(true)
    }
  }

  // Background Animation,
  // Conditional Auth render
  return (
    <motion.div
      exit={{opacity: 0.9}}
      animate={{opacity: 1}}
      initial={{opacity: 0.6}}
      transition={{duration: 0.5}}
      // background={Color.toHexString(blue)}
    >
      <BackgroundParticles />
      <div id="homediv">
        <Frame
          variants={container}
          initial={{scaleX: 0.9, y: 30}}
          animate={{scaleX: 1.19, y: 1}}
          transition={{duration: 9, yoyo: Infinity}}
          style={style}
        >
          <header
            style={{
              textShadow: '2px 6px 6 rgba(218, 217, 217, 0.346)',
            }}
          >
            a e t h e r
          </header>
        </Frame>

        <br />
        <div style={{textAlign: 'center'}}>
          {loading ? (
            <Loading />
          ) : auth.currentUser !== null ? (
            <Frame
              variants={container}
              initial="hidden"
              animate="show"
              style={{...style, marginTop: '8%'}}
            >
              <Frame variants={item} style={style}>
                <Link to="/sesh">
                  <button
                    className={
                      enableOutline
                        ? 'home-btn'
                        : 'no-outline-on-focus home-btn'
                    }
                    type="button"
                    style={{textAlign: 'center'}}
                  >
                    start jamming {'>'}
                  </button>
                </Link>
              </Frame>
              <br />
              <Frame variants={item} style={style}>
                <Link to="/studio">
                  <button
                    className={
                      enableOutline
                        ? 'home-btn'
                        : 'no-outline-on-focus home-btn'
                    }
                    type="button"
                    style={{textAlign: 'center'}}
                  >
                    account {'>'}
                  </button>
                </Link>
              </Frame>
              <br />
              <Frame variants={item} style={style}>
                <SignOut user={user} enableOutline={enableOutline} />
              </Frame>
              <br />
            </Frame>
          ) : (
            <Frame
              variants={container}
              initial="hidden"
              animate="show"
              style={{...style, marginTop: '8%'}}
            >
              <Frame variants={item} style={style}>
                <Link to="/sesh">
                  <button
                    className={
                      enableOutline
                        ? 'home-btn'
                        : 'no-outline-on-focus home-btn'
                    }
                    type="button"
                    style={{textAlign: 'center', marginTop: '3%'}}
                  >
                    start jamming {'>'}
                  </button>
                </Link>
              </Frame>
              <br />
              <Frame variants={item} style={style}>
                <SignIn enableOutline={enableOutline} />
              </Frame>
              <br />
            </Frame>
          )}
          <br />
        </div>
      </div>
    </motion.div>
  )
}

// Connect Redux
const mapStateToProps = (state) => ({user: state.user})
const mapDispatchToProps = (dispatch) => ({
  setNewUser: (user) => dispatch(setNewUser(user)),
  signOutUser: (user) => dispatch(signOutUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
