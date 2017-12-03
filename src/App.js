// TO DO Componentss:
  // Nav bar
  // Footer
  // Login / signup
import Nav from './Nav/Nav';
import React, { Component } from 'react';
import './App.css';
import LandingPage from './Landing/landingView'
// import MapView from './Map/mapView';
import {Journal, JournalNewEntry} from './Journal/Journal';
// import Subscription from './Subscription/Subscription';
import Subscribe from './Subscription/Subscribe';
import SignUp from './Users/SignUp';
import Login from './Users/Login';
import firebase from 'firebase/app';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      errorMessage : null
    };
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser){ // User logged in
        this.setState({user: firebaseUser, loading : false});
      } else { // User logged out
        this.setState({user:null, loading : false});
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
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

  handleSignOut() {
    this.setState({errorMessage:null});

    firebase.auth().signOut()
    .catch((err) => this.setState({errorMessage: err.message}));
  }

  render() {
    let contents = null;
    if (!this.state.user) {
      contents = (
        <div>
          <Nav user={this.state.user} handleSignOutCallback={() => this.handleSignOut()}/>
          <Switch>
            <Route exact path="/" component={(props) => <LandingPage
              handleSignOutCallback={() => this.handleSignOut()}/>}></Route>
            <Route exact path="/login" component={(props) => <Login signInCallback={(e,p) =>
               this.handleSignIn(e,p)}/>}></Route>
            <Route exact path="/signup" component={(props) => <SignUp signUpCallback={(e,p) =>
               this.handleSignUp(e,p)}/>}></Route>
            <Redirect to="/"></Redirect>
          </Switch>


          <p>{this.state.errorMessage}</p>
        </div>);
    } else {
      contents = (
        <div>
          <Nav user={this.state.user} handleSignOutCallback={() => this.handleSignOut()}/>
          <Journal />
        </div>
      );
    }
    return (
      <div>
        {/* <LandingPage/> */}
        {/* <MapView/> */}
        {/* <header className="App-header">*/}
        {/* Home Chocobook Catalog Choco Box Login */}
        {/* </header> */}
        {/* <Subscription /> */}
        {/* <Subscribe /> */}
        {contents}
      </div>
    );
  }
}


export default App;
