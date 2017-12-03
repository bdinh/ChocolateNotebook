import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAz4zkqYNBNFAWxcMqvImPzVaLq91yPOAI",
  authDomain: "chocolatenotebook-info343-a17.firebaseapp.com",
  databaseURL: "https://chocolatenotebook-info343-a17.firebaseio.com",
  projectId: "chocolatenotebook-info343-a17",
  storageBucket: "",
  messagingSenderId: "491534616181"
};
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
