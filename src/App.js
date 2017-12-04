// TO DO Componentss:
// Nav bar
// Footer
// Login / signup

import React, { Component } from 'react';
import './App.css';
// import LandingPage from './Landing/landingView'
// import MapView from './Map/mapView';
import {Journal, JournalNewEntry} from './Journal/Journal';
// import Subscription from './Subscription/Subscription';
import Subscribe from './Subscription/Subscribe';
import SignUp from './Users/SignUp';
import Login from './Users/Login';
import firebase from 'firebase/app';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      errorMessage : null
    };
  }
  
  //signs up a new user.
  handleSignUp(email, password)  {
    this.setState({errorMessage:null});
    this.setState({loading:true});
    let promise = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((firebaseUser) =>  {
      firebaseUser.updateProfile({
        displayName: email
      });      
      
      // Add to database a store for the user
      let newUserData = {
        userName : email,
        userJournalEntries : {}
      }
      let userDataRef = firebase.database().ref('userData');
      userDataRef.push(newUserData);
      
    })
    .catch((error) =>  {
      this.setState({errorMessage : error.message});
      this.setState({loading:false});
    });
  }
  
  //logs an existing user in.
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear old error
    this.setState({loading:true});
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      this.setState({errorMessage: error.message});
      this.setState({loading:false});
    });
  }
  
  render() {
      return (
        <div>
        {/* <LandingPage/> */}
        {/* <MapView/> */}
        {/* <header className="App-header">*/}
        {/* Home Chocobook Catalog Choco Box Login */}
        {/* </header> */}
        {/* <Journal currentUser={this.state}/> */}
        {/* <Subscription /> */}
        {/* <Subscribe /> */}
        <SignUp signUpCallback={(e,p) => this.handleSignUp(e,p)}/>
        <Login signInCallback={(e,p) => this.handleSignIn(e,p)}/>
        </div>
      );
    }
}


export default App;
