import React, { Component } from 'react';
import $ from "jquery";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import './landing.css'
import { Link  } from 'react-router-dom';


export default class LandingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div>
            {/* <div className="navbar-container">
                <nav className="navbar navbar-toggleable-sm navbar-inverse fixed-top">
                    <a className="navbar-brand" href="#home">(Logo Goes Here)</a>
                    <button className="navbar-toggler-right btn login-button" type="button">
                    <Link to='/login'>Login</Link></button>
                    <button className="navbar-toggler-right btn login-button" type="button">
                    <Link to='/signup'>Sign Up</Link></button>
                </nav>
            </div> */}

            <div className="landing-image">
                <p className="hero-text quote">"Seven days without Chocolate makes one weak"</p>
                <p className="hero-text cited">- unknown author</p>
                <button type="button" className="btn get-started-button">Get Started</button>
            </div>
            <div className="our-story section-block">
                <p className="section-title">Our Story</p>
            </div>
            <div className="history section-block">
                <p className="section-title">Our History</p>
            </div>
            <div className="footer">
                <p className="section-title">Footer</p>
            </div>
        </div>

        );
    }

}
