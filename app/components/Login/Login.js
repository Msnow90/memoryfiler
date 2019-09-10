import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Login.css';


import { loginToServer } from '../../reducers/auth';

// receives this.props.login to submit form data
class Login extends Component {

	constructor() {
		super();

		this.state = {
			loginError: false
		}

		this.login = this.login.bind(this);
	}

	// bind this method to login form submit button
	login(evt) {
		evt.preventDefault();

		var username = evt.target.username.value;
		var password = evt.target.password.value;

		// call login thunk
		this.props.loginToServer(username, password)
	}

	render() {

		return (
			<div className="login-container container">
				<h3>Sign In</h3>
				<hr></hr>
				{
					this.props.err && <span className="loginError">Invalid Login Credentials!</span>
				}
				<form onSubmit={this.login}>


					<div className="col-auto">
						<label className="sr-only">Username</label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">@</div>
							</div>
							<input type="text" name="username" className="form-control" placeholder="Username" />
						</div>
					</div>


					<div className="col-auto">
						<label className="sr-only">Password</label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text"><i className="fas fa-user-lock"></i></div>
							</div>
							<input type="password" name="password" className="form-control" id="inlineFormInputGroup" placeholder="password" />
						</div>
					</div>



					<div className="button-container">
						<button id="login-submit" type="submit" className="btn action-btn">Log In</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		err: state.errors.auth
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

		loginToServer: (username, password) => {
			dispatch(loginToServer(username, password))
				.then((result) => {
					ownProps.history.push('/dashboard');
				})
				.catch(err => {
					
				})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)