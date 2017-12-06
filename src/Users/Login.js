import React, { Component } from 'react';
import '../Subscription/Subscription.css';
import { Link  } from 'react-router-dom';
import './Auth.css';
import $ from 'jquery';
import { bindAll } from 'lodash';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        };
        this.emailErrors= [];
        this.passwordErrors=[];
        this.emailValid=undefined;
        this.passwordValid=undefined;
        bindAll(this, [
            'handleSignIn',
            'handleChange'
        ])
        //initialize state
    }

    componentDidMount() {
        $('#nav').hide();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.errorMessage !== nextProps.props.errorMessage ) {
            this.props.errorMessage = nextProps.props.errorMessage;
        }
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
        const {
            errorMessage
        } = this.props;

        if (this.state.loading) {
            return (
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."/>
                </div>
            )
        } else {
            return (
                <div id="login">
                    <div className="row row-container">
                        <div className="login-banner-container">
                        </div>
                        <div className="brown-vertical-stroke">
                        </div>
                        <div className="user-login-container">
                            <div className="title-text">
                                <p>Chocolate Notebook Login</p>
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
                                            valid={this.emailValid}
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
                                            valid={this.emailValid}
                                        />
                                    </div>
                                    {this.passwordErrors}
                                    <div className="new-account-text-container">
                                        <p className="new-account-text form-labels">Don't have an account? <Link to='/signup'>Join</Link></p>
                                    </div>
                                    <div className="login-button-container">
                                        <button
                                            className="btn btn-primary login-button"
                                            onClick={this.handleSignIn}>
                                            Login
                                        </button>
                                    </div>
                                </div>
                            <p className="email-error">{errorMessage ? errorMessage : ""}</p>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Login; //the default



