import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutForm from '../Checkout/Checkout';

import { Elements, StripeProvider } from 'react-stripe-elements';

import './Register.css';


import { registerToServer, clearErrors } from '../../reducers/auth';

// receives this.props.login to submit form data
class Register extends Component {

	constructor() {
		super();

		this.state = {
			cardInfoComplete: false,
			usernameValid: false,
			passwordsMatch: false
		}

		this.register = this.register.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
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
				<Link to="/"><i className="fas fa-chevron-circle-left back-icon"></i></Link>
					<StripeProvider apiKey="pk_test_IBu0cg59EaOvKu5y4QviGcgH00E22CzB36">

						<div className="example">
							<Elements>
								<CheckoutForm />
							</Elements>
						</div>
					</StripeProvider>

			</div>
		)
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

export default connect(null, mapDispatchToProps)(Register)