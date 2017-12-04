import React, { Component } from 'react';
import $ from "jquery";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import { Link  } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component  {
  render()  {
    return(
      <div id="nav">
          <nav className="navbar">
              <Link to='/'>(Logo Goes Here)</Link>
              {!this.props.user ?
                <div className="nav-item">
                  <Link to='/login'><button className="btn login-button" type="button">
                  Login</button></Link>
                  <Link to='/signup'><button className="btn login-button" type="button">
                  Sign Up</button></Link>
                </div>
              :
                [<div className="nav-item">
                  <Link to="/catalog">Catalog</Link>
                  <Link to="/journal">Journal</Link>
                  <Link to="/subscription">Subscription</Link>
                </div>,
                <div className="nav-item">
                  <button className="btn login-button" type="button" onClick={(e) => this.props.handleSignOutCallback(e)}>
                  Sign Out</button>
                </div>]}
          </nav>
      </div>
    );
  }
}

export default Nav;
