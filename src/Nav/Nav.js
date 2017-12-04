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
              <a className="navbar-brand"><Link to='/'>(Logo Goes Here)</Link></a>
              {!this.props.user ?
                <div>
                  <Link to='/login'><button className="btn login-button" type="button">
                  Login</button></Link>
                  <Link to='/signup'><button className="btn login-button" type="button">
                  Sign Up</button></Link>
                </div>
              :
              <button className="btn login-button" type="button" onClick={(e) => this.props.handleSignOutCallback(e)}>
              Sign Out</button>}
          </nav>
      </div>
    );
  }
}

export default Nav;
