import React, { Component } from 'react';
import '../Subscription/Subscription.css';
import { Link  } from 'react-router-dom';
import './Auth.css';
import $ from 'jquery';
import { bindAll } from 'lodash';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: undefined,
      password: undefined
    }; //initialize state
    this.emailErrors= [];
    this.passwordErrors=[];
    this.emailValid=undefined;
    this.passwordValid=undefined;
    bindAll(this, [
        'handleSignUp',
        'validate',
        'handleChange'
    ])
  }

  componentDidMount() {
      $('#nav').hide();
  }

  handleSignUp(event) {
    event.preventDefault(); //don't submit
    let handle = this.state.handle || this.state.email; //assign default if undefined
    this.props.signUpCallback(this.state.email, this.state.password, handle);
  }

  validate(value, validations) {
    if(value !== undefined) { //check validations

      //handle password minLength
      if (value.name === "password") {
        this.passwordErrors=[];
        this.passwordValid = true;
        if(validations.minLength && value.value.length < validations.minLength){
          this.passwordErrors.push(`Must be at least ${validations.minLength} characters.`);
          this.passwordValid = false;
          this.passwordErrors = this.passwordErrors.map((item) =>
          {return <p className="password-error" key={item}>{item}</p>});
          return this.passwordErrors;
        }
      }

      //handle email type
      if (value.name === "email") {
        this.emailErrors= [];
        this.emailValid = true;
        if (validations.required && value.value === ''){
          this.emailErrors.push('Required field.');
          this.emailValid = false;
        }
        if (validations.email) {
          //pattern comparison from w3c
          //https://www.w3.org/TR/html-markup/Input.email.html#Input.email.attrs.value.single
          let valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.value)
          if(!valid){
            this.emailErrors.push('Not an email address.')
            this.emailValid = false;
          }
          this.emailErrors = this.emailErrors.map((item) =>
          {return <p className="email-error" key={item}>{item}</p>});
          return this.emailErrors;
        }
      }
    }
    return undefined; //no errors defined (because no value defined!)
  }

  handleChange(event) {
    if (event.target.name === "password") {
      this.validate(event.target, {required: true, minLength: 6});
    }
    if (event.target.name === "email") {
      this.validate(event.target, {required: true, email: true});

    }
    if (event.target.name === "handle") {
      this.validate(event.target, {required: false});
    }

    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  /* SignUp#render() */
  render() {
    return (
      <div id="signup">
        <div className="row row-container">
          <div className="login-banner-container">
          </div>
          <div className="brown-vertical-stroke">
          </div>
          <div className="user-login-container">
            <div className="title-text">
              <p>Chocolate Notebook Sign Up</p>
            </div>
            <div className="login-form">
              <div className="form-group email-form">
                <label  className="form-labels" htmlFor="loginEmail">Email address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    // valid={this.emailValid} what does this do actually?
                />
              </div>
                {this.emailErrors}
              <div className="form-group form-group-spacing">
                <label className="form-labels" htmlFor="loginPassword">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    // valid={this.emailValid}
                />
              </div>
                {this.passwordErrors}
              <div className="new-account-text-container">
                <p className="new-account-text form-labels">Already have an account? <Link to='/login'>Login</Link></p>
              </div>
              <div className="signup-button-container">
                <button
                    className="btn btn-primary signup-button"
                    onClick={this.handleSignUp}
                    disabled={!(this.emailValid && this.passwordValid)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default SignUp; //the default
