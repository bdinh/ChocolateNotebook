import React, { Component } from 'react';
import '../Subscription/Subscription.css';
import { Link  } from 'react-router-dom';
import './Auth.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        }; //initialize state

    }

    //handle signIn Button
    handleSignIn(event) {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);

    }

    handleChange(event) {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    /* SignUpForm#render() */
    render() {
        if (this.state.loading) {
            return (
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        } else {
            return (
                <div id="login">
                    {/* email */}
                  <form>
                    <label>Email</label>
                    <input id="email"
                           type="email"
                           name="email"
                           onChange={((event) => {this.handleChange(event)}) }
                           valid={this.emailValid}
                    />
                      {this.emailErrors}
                  </form>

                    {/* password */}
                  <form>
                    <label>Password</label>
                    <input id="password"
                           type="password"
                           name="password"
                           onChange={((event) => {this.handleChange(event)}) }
                           valid={this.passwordValid}
                    />
                      {this.passwordErrors}
                  </form>

                    {/* Buttons */}
                  <form>
                    <button className="mr-2" color="primary" onClick={(e) => this.handleSignIn(e)}>
                      Sign-in
                    </button>
                    <button color="primary">
                      <Link to='/signup'>Need to make an account? Sign Up Here</Link>

                    </button>
                  </form>
                </div>
            )
        }
    }
}

export default Login; //the default

          {/*<div className="row row-container">*/}
            {/*<div className="login-banner-container">*/}
            {/*</div>*/}
            {/*<div className="user-login-container">*/}
              {/*<div className="login-form">*/}
                {/*<div className="form-group email-form">*/}
                  {/*<label  className="form-labels" htmlFor="loginEmail">Email address</label>*/}
                  {/*<input*/}
                      {/*type="email"*/}
                      {/*className="form-control"*/}
                      {/*id="loginEmail"*/}
                      {/*aria-describedby="emailHelp"*/}
                      {/*placeholder="Enter email"*/}
                  {/*/>*/}
                {/*</div>*/}
                {/*<div className="form-group form-group-spacing">*/}
                  {/*<label className="form-labels" htmlFor="loginPassword">Password</label>*/}
                  {/*<input*/}
                      {/*type="password"*/}
                      {/*className="form-control"*/}
                      {/*id="loginPassword"*/}
                      {/*placeholder="Password"/>*/}
                {/*</div>*/}
                {/*<div className="new-account-text-container">*/}
                  {/*<p className="new-account-text">Don't have an account? <Link to='./join'>Join</Link></p>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}

