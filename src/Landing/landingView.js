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
                <div className="get-started-button-container">
                    <button type="button" className="btn get-started-button">Get Started</button>
                </div>
            </div>


            <div className="our-story section-block">
                <p className="section-title">Our Story</p>
                <p className="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer quis massa sit amet eros malesuada tempor.
                    In nec quam elementum, cursus neque ac, bibendum dui.
                    Sed vulputate semper nisi, nec porta magna tincidunt sed.
                    Fusce nec nisi sapien. Curabitur nisi lectus, dignissim
                    in elit viverra, lobortis tristique tortor. In gravida
                    finibus enim vel dignissim. Duis at nibh vitae sapien
                    blandit congue vel at dui. Integer facilisis ante leo,
                    sit amet dictum metus convallis efficitur. Morbi viverra,
                    ipsum at venenatis elementum, mi magna maximus libero,
                    vitae placerat velit nisi quis leo. Vivamus vitae mattis
                    nisl. Etiam vitae ex ut ligula scelerisque maximus.</p>
            </div>


            <div className="history section-block">
                <p className="section-title">History of Chocolate</p>
                <p className="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer quis massa sit amet eros malesuada tempor.
                    In nec quam elementum, cursus neque ac, bibendum dui.
                    Sed vulputate semper nisi, nec porta magna tincidunt sed.
                    Fusce nec nisi sapien. Curabitur nisi lectus, dignissim
                    in elit viverra, lobortis tristique tortor. In gravida
                    finibus enim vel dignissim.</p>
            </div>
            <div className="footer">
                <p className="section-title">Footer</p>
            </div>
        </div>

        );
    }

}
