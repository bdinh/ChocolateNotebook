import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import { Link  } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component  {
  render()  {

      const {
          user,
          handleSignOutCallback,
      } = this.props;

    return(
      <div id="nav">
          <nav className="main-nav">
              <Link to='/'>(Logo Goes Here)</Link>
              {!user ?
                <div className="nav-item">
                  <Link to='/login'><button className="btn login-button" type="button">
                  Login</button></Link>
                  <Link to='/signup'><button className="btn signup-button" type="button">
                  Sign Up</button></Link>
                </div>
              :
                [<div className="nav-item">
                  <Link to="/catalog">Catalog</Link>
                  <Link to="/journal">Journal</Link>
                  <Link to="/subscription">ChocoBox</Link>
                </div>,
                <div className="nav-item signout-button">
                  <button className="btn" type="button" onClick={(e) => handleSignOutCallback(e)}>
                  Sign Out</button>
                </div>]}
          </nav>
      </div>
    );
  }
}

export default Nav;
