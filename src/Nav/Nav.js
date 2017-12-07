import React, { Component } from 'react';

import '../include/bootstrap';

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
        <div className="navbar-container">
        {!user ?
          (<nav className="navbar navbar-expand-md fixed-top navbar-dark">
              <a className="navbar-brand" href="#">(Logo Goes Here)</a>
              <button className="navbar-toggle navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon icon-bar"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item active">
                          <div className="link-centered">
                              <Link to='/login'>
                                  <button className="btn login-button" type="button">
                                      Login
                                  </button>
                              </Link>
                          </div>
                      </li>
                      <li className="nav-item">
                          <div className="link-centered">
                              <Link to='/signup'>
                                  <button className="btn signup-button" type="button">
                                      Sign Up
                                  </button>
                              </Link>
                          </div>
                      </li>
                  </ul>
              </div>
          </nav>)
            :
          (<nav className="navbar navbar-expand-md fixed-top navbar-dark logged-navbar">
              <a className="navbar-brand" href="#">(Logo Goes Here)</a>
              <button className="navbar-toggle navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon icon-bar"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item active">
                          <div className="link-centered">
                              <Link to="/catalog">
                                  <button
                                      className="btn link-button"
                                      type="button"
                                  >
                                      Catalog
                                  </button>
                              </Link>
                          </div>
                      </li>
                      <li className="nav-item active">
                          <div className="link-centered">
                              <Link to="/journal">
                                  <button
                                      className="btn link-button"
                                      type="button"
                                  >
                                      Journal
                                  </button>
                              </Link>
                          </div>
                      </li>
                      <li className="nav-item active">
                          <div className="link-centered">
                              <Link to="/subscription">
                                  <button
                                      className="btn link-button"
                                      type="button"
                                  >
                                      ChocoBox
                                  </button>
                              </Link>
                          </div>
                      </li>
                      <li className="nav-item">
                          <div className="link-centered">
                              <Link to='/signup'>
                                  <button
                                      className="btn signout-button"
                                      type="button"
                                      onClick={(e) => handleSignOutCallback(e)}
                                  >
                                      Sign Out
                                  </button>
                              </Link>
                          </div>
                      </li>
                  </ul>
              </div>
          </nav>)
        }
        </div>
      </div>);
  }
}

export default Nav;
