import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Root.css';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// thunks
import { verifyToken } from '../reducers/auth';


// import components here
import Login from './Login/Login';
import Register from './Register/Register';
import ErrorComponent from './Error';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';


class Root extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		var possibleToken = localStorage.getItem('token');

		if (possibleToken != null)
			this.props.verifyToken(possibleToken);
	}


	render() {

		var username = this.props.username;
		var userid = this.props.userid;

		return (
			<div>
				<Router>
					<div>
						<div className="content-wrapper">
							{
								this.props.serverError && <div className="alert alert-danger">There was an error with our servers, please try again.</div>
							}
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => <LandingPage {...props} userid={userid} username={username} />}
								/>

								<Route
									exact
									path="/dashboard"
									render={(props) => <Home {...props} />}
								/>

								<Route
									exact
									path='/register'
									render={(props) => <Register {...props}/>}
								/>

								<Route
									exact
									path='/login'
									render={(props) => <Login {...props}/>}
								/>
								<Route
									render={(props) => <LandingPage {...props} userid={userid} username={username} />}
								/>
							</Switch>
						</div>
					</div>
				</Router>
			</div>
		)
	}
}

// "state" is actually the store
const mapStateToProps = (state) => {

	return {
		username: state.auth.username,
		userid: state.auth.userid,
		serverError: state.errors.server
	}

}


const mapDispatchToProps = (dispatch) => {

	return {
		verifyToken: (token) => {
			dispatch(verifyToken(token))
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Root);