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
// import Subscribe from './Subscription/Subscribe';

class App extends Component {

  handleSignUp(email, password)  {

  }

  render() {
    return (
      <div>
        {/* <LandingPage/> */}
        <MapView/>
        {/* <header className="App-header">*/}
        {/* Home Chocobook Catalog Choco Box Login */}
        {/* </header> */}
        {/*<Journal />*/}
        {/* <Subscription /> */}
        {/*<Subscribe />*/}
      </div>
    );
  }
}


export default App;
