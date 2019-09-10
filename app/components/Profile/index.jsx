import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import { retrieveUser, clearUser, deleteUser } from '../../reducers/userToExamine';
import { receivedErr, logoutFromReducer } from '../../reducers/auth';

class Profile extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
			this.props.retrieveUser(this.props.match.params.userId) // fetch user
	}

	componentWillUnmount() {
		this.props.clearUser();
	}

	render() {
		var username, email, buttonSet, posts;
		var userToExamine = this.props.userToExamine;

		// we have to use this logic since we want to display whether a user is
		if (userToExamine.username) {
			username = <p>Username: {userToExamine.username}</p>;
			email = <p>Email: {userToExamine.email} </p>;

			// supposed to contain all posts from the user (need to configure database)
			posts = userToExamine.selfArgs.map(argument => {
				return (
					<div>
						Example Post
					</div>
				)
			})
			
			if (userToExamine.username === this.props.loggedInUser) {
				buttonSet = <button onClick={() => this.props.deleteUser(userToExamine._id)}>Delete Account</button>
			}
		}

		else {
			username = <p>User account has been deleted.</p>
		}

		return (
			<div className="container profile-container">
				<div className="row">
					<div className="col-md">
						<h2>Profile Info</h2>
						{username}
						{email}
						{buttonSet}
					</div>
					<div className="col-md">
						<h2>Post History</h2>
						{posts}
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		userToExamine: state.userToExamine,
		loggedInUser: state.auth.username
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// add the thunk to retrieve user
		retrieveUser: (userId) => {
			dispatch(retrieveUser(userId))
		},

		clearUser: () => {
			dispatch(clearUser());
		},

		deleteUser: (userid) => {
			var token = localStorage.getItem('token');

			if (!token) return dispatch(receivedErr('Not authorized to perform this action!'));

			dispatch(deleteUser(userid, token));

			dispatch(logoutFromReducer());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
