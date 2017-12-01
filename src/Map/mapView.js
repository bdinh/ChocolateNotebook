import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import './mapview.css';

export default class MapView extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
          <div>
              <div className="navbar-container">
                  <nav className="navbar navbar-toggleable-sm navbar-inverse fixed-top">
                      <a className="navbar-brand" href="#home">(Logo Goes Here)</a>
                      <div className="collapse navbar-collapse" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item active">
                                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="#">Features</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="#">Pricing</a>
                              </li>
                          </ul>
                      </div>
                  </nav>
              </div>
          </div>
        );

    }
}