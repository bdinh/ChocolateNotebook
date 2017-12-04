import React, { Component } from 'react';
import '../Subscription/Subscription.css';
import { Link  } from 'react-router-dom';


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
