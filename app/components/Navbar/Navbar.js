import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';

import { logoutFromReducer } from '../../reducers/auth';


const RoutedLogoutButton = withRouter(({ history, logout }) => {
	return (
		<button className="profile-button btn btn-sm none-action-btn" onClick={() => {
			logout();
			setTimeout(() => history.push('/'),100);
		}}>Logout</button>
	)
})

class Navbar extends Component {

	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {
		localStorage.removeItem('token');
		this.props.logoutFromReducer();
	}

	render() {
		var username = this.props.username;
		var userid = this.props.userid;

		var changeToAboutPage = this.props.changeToAboutPage;
		var changeToLearnPage = this.props.changeToLearnPage;
		var changeToLandingPage = this.props.changeToLandingPage;
		var changeToBugPage = this.props.changeToBugPage;
		var changeToLoginPage = this.props.changeToLoginPage;
		var changeToRegisterPage = this.props.changeToRegisterPage;

		let loginButton, registerButton, profileButton, logoutButton;

		// sets buttons to correct types if a user is NOT logged in
		if (!username || !userid) {
			loginButton = <button onClick={changeToLoginPage} className="btn btn-sm none-action-btn">Log In</button>
			registerButton = <button onClick={changeToRegisterPage} className="btn btn-sm action-btn">Sign Up</button>
		}
		// sets buttons to correct types if a user IS logged in
		else {
			profileButton = <Link to="/dashboard"><button className="btn btn-sm action-btn">Dashboard</button></Link>;
			//logoutButton = <button className="logout-button btn btn-outline-danger" onClick={this.logout}>Logout</button>
			logoutButton = <RoutedLogoutButton logout={this.logout}/>;
			loginButton = null;
			registerButton = null;
		}

		return (
			<div className="navigation">
				<div className="navigation-brand">
					<img src="/static/assets/memfilertrans.png" alt="Logo" onClick={changeToLandingPage} style={{cursor: 'pointer', height: 50, width: 50}}></img>
					<i onClick={changeToLandingPage} className="fas fa-home">  Home</i>
					<i onClick={changeToLearnPage} className="fas fa-user-graduate">  Learn</i>
					{/* <i onClick={changeToAboutPage} className="fas fa-question-circle">  About</i> */}
					<i onClick={changeToBugPage} className="fas fa-bug">Report Bug/Request Feature</i>
				</div>
				<div className="navigation-center">
				</div>
				<div className="navigation-right">


					{loginButton}
					{registerButton}
					{profileButton}
					{logoutButton}
				</div>
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => {
	return {
		logoutFromReducer: () => {
			dispatch(logoutFromReducer());
		}
	}
}

export default connect(null, mapDispatchToProps)(Navbar);