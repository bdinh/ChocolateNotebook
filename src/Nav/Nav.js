import React, { Component } from 'react';
import $ from "jquery";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import '../Landing/landing.css';
import { Link  } from 'react-router-dom';

export default class Nav extends Component  {
  render()  {
    return(
      <div className="navbar-container">
          <nav className="navbar navbar-toggleable-sm navbar-inverse">
              <a className="navbar-brand"><Link to='/'>(Logo Goes Here)</Link></a>
              {!this.props.user ?
                <div className="container">
                  <button className="navbar-toggler-right btn login-button" type="button">
                  <Link to='/login'>Login</Link></button>
                  <button className="navbar-toggler-right btn login-button" type="button">
                  <Link to='/signup'>Sign Up</Link></button>
                </div>
              :
              <button className="navbar-toggler-right btn login-button" type="button" onClick={(e) => this.props.handleSignOutCallback(e)}>
              Sign Out</button>}
          </nav>
      </div>
    );
  }
}
