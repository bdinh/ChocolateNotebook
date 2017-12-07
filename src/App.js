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
import SubscriptionInfo from './Subscription/SubscriptionInfo';
import { handleRows, ChooseRow } from './Subscription/Subscribe';
// import PrivateRoute from './PrivateRoute';

class App extends Component {
    constructor(props){
        super(props);
        this.today = new Date();
        this.start = this.today.getMonth() * 15;
        this.state = {
            loading : true,
            errorMessage : null,
            userData:  {
                userName : null,
                userJournalEntries : null,
                subscription : null
            },
            month: this.today.getMonth(),
            rows: handleRows("Trials", this.start),
            index: 'month_one'
        };
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser){ // User logged in
                this.setState({user: firebaseUser});
                this.userDataRef = firebase.database().ref('userData/' + firebaseUser.uid)
                this.userDataRef.on('value', (snapshot) => {
                    this.setState({userData: snapshot.val(), loading: false});
                    if (this.state.userData.subscription) {
                      this.setState({rows:handleRows(this.state.userData.subscription.plan, this.start)})
                    }
                });
            } else { // User logged out
                this.setState({user:null, loading: false});
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
                userJournalEntries : "None",
                subscription : null
            }

            let userDataRef = firebase.database().ref('userData/' + firebaseUser.uid)
                .set(newUserData);
            // userDataRef.child(firebaseUser.uid).push(newUserData);

        })
        .catch((error) =>  {
            this.setState({
                errorMessage : error.message,
                loading:false
            });
        });
    }

    //logs an existing user in.
    handleSignIn(email, password) {
        // this.setState({errorMessage:null}); //clear old error
        this.setState({loading:true});
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            this.setState({errorMessage: error.message});
            this.setState({loading:false});
        });
    }

    handleSignOut() {
        this.setState({loading: true, errorMessage:null});
        firebase.auth().signOut()
        .catch((err) =>   {
            this.setState({
                loading: false,
                errorMessage: err.message});
            });
    }

    handleAddSubscription(plan)  {
        let setPlan = firebase.database().ref('userData/' + this.state.user.uid + '/subscription')
            .set({plan:plan, months:{month_one:true, month_two:true, month_three:true}});
    }

    handleUnsubscribe()  {
        let setNull = firebase.database().ref('userData/' + this.state.user.uid + '/subscription')
            .set(null);
    }

    handleSkip(month, bool)  {
      let setSkip = firebase.database().ref('userData/' + this.state.user.uid + '/subscription/months/' + month)
        .set(bool);
    }

    handleSwitchMonth(increment, month)  {
      let newState = (this.today.getMonth() + increment) % 12;
      this.setState({month:newState});
      this.setState({rows:handleRows(this.state.userData.subscription.plan, this.start + (15 * increment))});
      this.setState({index: month});
    }

    render() {
        console.log(this.state.errorMessage);
        if (this.state.loading) { // If loading, display spinner
            return (
                <div className="loading-screen">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        } else {
            let contents = null;
            if (!this.state.user) {
                contents = (
                    <div className="content-wrapper">
                      <Switch>
                        <Route exact path="/" render={(routerProps) => {
                            return (<LandingPage />)
                        }}/>
                        <Route exact path="/login" render={(routerProps) => {
                            return (<Login
                                {...routerProps}
                                signInCallback={(e,p) =>
                                    this.handleSignIn(e,p)}
                                errorMessage={this.state.errorMessage}
                            />)
                        }}/>
                        <Route exact path="/signup" component={(props) => <SignUp signUpCallback={(e,p) =>
                            this.handleSignUp(e,p)} errorMessage={this.state.errorMessage}/>}/>
                        <Redirect to="/" exact/>
                      </Switch>
                    </div>);
            } else {
                contents = (
                    <div className='logged'>
                        {/* <Nav user={this.state.user} handleSignOutCallback={() => this.handleSignOut()}/> */}
                      <Switch>
                        <Route exact path="/catalog" component={(props) => <Catalog />}></Route>
                        <Route exact path="/journal" component={(props) => <Journal currentUser={this.state.user} />}></Route>
                        <Route exact path="/subscription" component={(props) =>
                          <Subscription handleSkip={(month, bool) => this.handleSkip(month, bool)}
                          loading={this.state.loading} subscription={this.state.userData.subscription}
                          routerprops={props} user={this.state.user} handleUnsubscribe={() => this.handleUnsubscribe()}/>}></Route>
                        <Route exact path="/subscription/subscribed" component={(props) =>
                          <SubscriptionInfo handleSkip={(month, bool) => this.handleSkip(month, bool)}
                          index={this.state.index} month={this.state.month} rows={this.state.rows}
                          subscription={this.state.userData.subscription} handleUnsubscribe={() => this.handleUnsubscribe()}
                          handleSwitchMonth={(increment, month) => this.handleSwitchMonth(increment, month)}/>}></Route>

                        {!this.state.userData.subscription ?
                        <Route exact path="/subscribe/:plan" component={(props) =>
                          <Subscribe routerprops={props} handleAddSubscription={(plan) =>
                          this.handleAddSubscription(plan)}/>}></Route> : ''}
                        <Route exact path="/newjournalentry" component={() => <JournalNewEntry
                          currentUser={this.state.user} />}></Route>

                        <Redirect to="/journal"></Redirect>
                      </Switch>
                    </div>
                );
            }
            return (
                <div className="app-wrapper">
                  <Nav user={this.state.user} handleSignOutCallback={() => this.handleSignOut()}/>
                    {contents}
                </div>
            );
        }
    }
}

export default App;
