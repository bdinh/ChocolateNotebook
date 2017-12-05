import Nav from './Nav/Nav';
import React, { Component } from 'react';
import './App.css';
import LandingPage from './Landing/landingView';
import Catalog from './Catalog/Catalog';
// import MapView from './Map/mapView';
import {Journal, JournalNewEntry} from './Journal/Journal';
import Subscription from './Subscription/Subscription';
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
        this.userDataRef = firebase.database().ref('userData/' + firebaseUser.uid)
        this.userDataRef.on('value', (snapshot) => {
          this.setState({userData: snapshot.val()});
        });
      } else { // User logged out
        this.setState({user:null, loading : false});
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
    this.userDataRef.off();
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
        uid : firebaseUser.uid,
        userJournalEntries : "None",
        plan : null
      }

      let userDataRef = firebase.database().ref('userData/' + firebaseUser.uid)
      .set(newUserData);
      // userDataRef.child(firebaseUser.uid).push(newUserData);

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

  handleAddSubscription(plan)  {
    let setPlan = firebase.database().ref('userData/' + this.state.user.uid + '/plan').set(plan);
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
            <Switch>
              <Route exact path="/catalog" component={(props) => <Catalog />}></Route>
              <Route exact path="/journal" component={(props) => <Journal />}></Route>
              <Route exact path="/subscription" component={(props) => <Subscription
              subscription={this.state.userData.plan} routerprops={props} user={this.state.user.uid}/>}></Route>
              {this.state.userData && !this.state.userData.plan ?
              <Route exact path="/subscribe/:plan" component={(props) =>
              <Subscribe routerprops={props} handleAddSubscription={(plan) => this.handleAddSubscription(plan)}/>}></Route>
              : ''}
              <Redirect to="/journal"></Redirect>
            </Switch>
            </div>
          );
        }
        return (
          <div>
          {contents}
          </div>
        );
      }
    }

export default App;
