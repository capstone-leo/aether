import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAWVIxjZTaEY90wBDSxj1v7ECUUKyG7Vb0',
	authDomain: 'sound-collabo.firebaseapp.com',
	projectId: 'sound-collabo',
	storageBucket: 'sound-collabo.appspot.com',
	messagingSenderId: '564645648142',
	appId: '1:564645648142:web:f0b8c196f95fd2b70c295f',
	measurementId: 'G-V44HEGZ64L'
});

// Initialize auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();
export const realtimeDB = firebase.database();
