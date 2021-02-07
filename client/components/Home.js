import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCL4dmyWs2djZQWA7SkJQM06ket2Z0VzJw",
  authDomain: "music-visual-jam-sesh.firebaseapp.com",
  databaseURL: "https://music-visual-jam-sesh-default-rtdb.firebaseio.com",
  projectId: "music-visual-jam-sesh",
  storageBucket: "music-visual-jam-sesh.appspot.com",
  messagingSenderId: "56740385434",
  appId: "1:56740385434:web:1f60538266d67451dc4523",
  measurementId: "G-QGC5XHSDST",
});
// Initialize auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();

// Main Component
const Home = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const showDirections = (event) => {
    event.preventDefault();

    setShowInstructions(!showInstructions);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: "60px" }}>
        <header id="mainHeader">a e t h e r</header>
        <p style={{ fontSize: "15px" }}>(working title)</p>
        <SignIn />
        <SignOut />
        <br />
        <Link to="/sesh">
          <button
            type="button"
            style={{ textAlign: "center", marginTop: "1%" }}
          >
            Start Jamming {">"}
          </button>
        </Link>
        <br />
        <button
          type="button"
          onClick={showDirections}
          style={{ textAlign: "center", marginTop: "1%", fontSize: "15px" }}
        >
          view instructions
        </button>

        {showInstructions ? (
          <ol style={{ textAlign: "center", fontSize: "15px" }}>
            <li>“One band. One Sound.”</li>
            <li>"If you ain't first, you're last" </li>
            <li>"You shall not pass!"</li>
            <li>"I am McLovin"</li>
            <li>
              "Life is like a box of chocolates, you never know what you're
              gonna get"
            </li>
          </ol>
        ) : null}
        <br />

        <Particles
          params={{
            particles: {
              line_linked: {
                shadow: {
                  enable: true,
                  color: "#3CA9D1",
                  blur: 5,
                },
              },
            },
          }}
          style={{
            width: "100%",
          }}
        />
      </div>
    </>
  );
};

// Helper Components
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //instatiate new auth token
    auth.signInWithPopup(provider);
    //prompts separate window to google login
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>; // button to prompt Google login
}
function SignOut() {
  return auth.currentUser ? (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  ) : null;
}
export default Home;
