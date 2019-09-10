import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Register.css';


import { registerToServer, clearErrors } from '../../reducers/auth';

// receives this.props.login to submit form data
class Register extends Component {

	constructor() {
		super();

		this.state = {
			// cardInfoComplete: false,
			// usernameValid: false,
			// passwordsMatch: false,
			username: '',
			usernamePass: false,
			password: '',
			passwordPass: false,
			confirmPassword: '',
			confirmPasswordPass: false,
			email: '',
			emailPass: false,
			failValidation: true
		}

		this.register = this.register.bind(this);
		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.performValidation = this.performValidation.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
	}

	onUsernameChange(e) {
		this.setState({ username: e.target.value }, () => {
			this.performValidation();
		})
	}

	onPasswordChange(e) {
		this.setState({ password: e.target.value }, () => {
			this.performValidation();
		})
	}

	onConfirmPasswordChange(e) {
		this.setState({ confirmPassword: e.target.value }, () => {
			this.performValidation();
		})
	}

	onEmailChange(e) {
		this.setState({ email: e.target.value }, () => {
			this.performValidation();
		})
	}

	performValidation() {
		if (this.state.username.length >= 4) {
			this.setState({ usernamePass: true })

			if (this.state.password.length >= 6) {
				this.setState({ passwordPass: true })

				if (this.state.password == this.state.confirmPassword) {
					this.setState({ confirmPasswordPass: true })

					if (this.state.email != '') {
						this.setState({ emailPass: true })
						return this.setState({ failValidation: false });
					}
					else
						this.setState({ emailPass: false })
				}
				else
					this.setState({ confirmPasswordPass: false })
			}
			else
				this.setState({ passwordPass: false })
		}
		else
			this.setState({ usernamePass: false })


		this.setState({ failValidation: true });
	}

	// bind this method to login form submit button
	register(evt) {
		evt.preventDefault();

		var username = evt.target.username.value;
		var password = evt.target.password.value;
		var email = evt.target.email.value

		// call login thunk
		this.props.registerToServer(username, password, email)
	}

	render() {

		return (
			<div>
				<div className="register-container container">


					<h3>Register</h3>
					<hr></hr>
					<form onSubmit={this.register}>
						<div className="container">

							{
								this.props.authError && <span className="registerError">{this.props.authError}</span>
							}

							<div className="col-auto">
								<label id="usernameHelp">Please choose a unique username with at least 4 characters.</label>
								<label className="sr-only" for="inlineFormInputGroup">Username</label>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<div className="input-group-text">@</div>
									</div>
									<input onChange={this.onUsernameChange} type="text" name="username" className="form-control" id="register-username" placeholder="Username" />
									{ this.state.usernamePass && <i className="fas fa-check register-check"></i> }
								</div>
							</div>


							<div className="col-auto">
								<label>Please choose a password that is at least 6 characters.</label>
								<label className="sr-only" for="inlineFormInputGroup">Password</label>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<div className="input-group-text"><i className="fas fa-user-lock"></i></div>
									</div>
									<input onChange={this.onPasswordChange} type="password" name="password" className="form-control" id="register-password" placeholder="password" />
									{ this.state.passwordPass && <i className="fas fa-check register-check"></i> }
								</div>
							</div>


							<div className="col-auto">
								<label>Confirm Password.</label>
								<label className="sr-only" for="inlineFormInputGroup">Confirm Password</label>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<div className="input-group-text"><i className="fas fa-user-lock"></i></div>
									</div>
									<input onChange={this.onConfirmPasswordChange} type="password" className="form-control" id="register-password" placeholder="confirm password" />
									{ this.state.confirmPasswordPass && <i className="fas fa-check register-check"></i> }
								</div>
							</div>



							<div className="col-auto">
								<label className="sr-only" for="inlineFormInputGroup">Email</label>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<div className="input-group-text"><i className="fas fa-envelope-open"></i></div>
									</div>
									<input onChange={this.onEmailChange} type="email" name="email" className="form-control" id="register-email" placeholder="email" />
									{ this.state.emailPass && <i className="fas fa-check register-check"></i> }
								</div>
							</div>

							<div className="button-container">
								<button disabled={this.state.failValidation} type="submit" id="register-submit" className="btn btn-lg action-btn">Register</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		authError: state.errors.auth
	}
}


const mapDispatchToProps = (dispatch, ownProps) => {
	return {

		registerToServer: (username, password, email, registeredParty) => {
			dispatch(registerToServer(username, password, email, registeredParty))
				.then(() => {
					ownProps.history.push('/dashboard');
				})
				.catch(err => {
				
				})
		},

		clearErrors: () => {
			dispatch(clearErrors());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)