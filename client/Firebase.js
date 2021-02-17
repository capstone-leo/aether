import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../config/secrets'

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig.firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const realtimeDB = firebase.database()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export const sceneRef = db.collection('Session')

export const setScene = async () => {
  if (auth.currentUser) {
    // console.log('scene-->', currentScene)
    return await sceneRef
      .doc(auth.currentUser.uid)
      // below delineate what to save to store
      .set(
        {
          //this needs to be user id for auth
          scene: store.getState().instruments,
        },
        {merge: true}
      )
  } else return console.log("you're not signed in, bucko!")
}

export const fetchScene = async () => {
  const doc = await sceneRef.doc(auth.currentUser.uid).get()
  if (!doc.exists) {
    console.log('No such document!')
  } else {
    return await doc.data()
  }
}
