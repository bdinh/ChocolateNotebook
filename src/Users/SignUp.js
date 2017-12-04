import React, { Component } from 'react';
import '../Subscription/Subscription.css';
import { Link  } from 'react-router-dom';
import './Auth.css';

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
          {return <p key={item}>{item}</p>});
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
          {return <p key={item}>{item}</p>});
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
      {/* email */}
      <form>
      <label for="email">Email</label>
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
      <label for="password">Password</label>
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
    <button className="mr-2" color="primary" onClick={(e) => this.handleSignUp(e)} disabled={ !(this.emailValid && this.passwordValid) } >
      Sign-up
    </button>
    <button className="mr-2" color="primary" >
      <Link to='/login'>Already have an account? Go to Login</Link>
    </button>
    </form>
  </div>
    );
  }
}
export default SignUp; //the default
