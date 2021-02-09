import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../config/secrets';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig.firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const realtimeDB = firebase.database();
