import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import About from '../About/About';
import Learn from '../Learn/Learn';
import Content from './Content';
import Footer from '../Footer/Footer';
import Request from '../Request/Request';

import './LandingPage.css';

export default class LandingPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentContent: "Content"
		}

		this.changeToAboutPage = this.changeToAboutPage.bind(this);
		this.changeToLearnPage = this.changeToLearnPage.bind(this);
		this.changeToLandingPage = this.changeToLandingPage.bind(this);
		this.changeToBugPage = this.changeToBugPage.bind(this);
		this.changeToLoginPage = this.changeToLoginPage.bind(this);
		this.changeToRegisterPage = this.changeToRegisterPage.bind(this);
	}

	changeToAboutPage() {
		this.setState({
			currentContent: 'About'
		})
	}

	changeToLearnPage() {
		this.setState({
			currentContent: 'Learn'
		})
	}

	changeToLandingPage() {
		this.setState({
			currentContent: 'Content'
		})
	}

	changeToBugPage() {
		this.setState({
			currentContent: 'Request'
		})
	}

	changeToLoginPage() {
		this.setState({
			currentContent: 'Login'
		})
	}

	changeToRegisterPage() {
		this.setState({
			currentContent: 'Register'
		})
	}

	render() {
		var currentContent, formDisplay;

		switch (this.state.currentContent) {

			case 'Content':
				currentContent = <Content changeToLearnPage={this.changeToLearnPage} changeToRegisterPage={this.changeToRegisterPage}/>;
				break;

			case 'About':
				currentContent = <About />;
				break;

			case 'Learn':
				currentContent = <Learn />;
				break;

			case 'Request':
				currentContent = <Request changeToLandingPage={this.changeToLandingPage}/>
				break;
			
			case 'Login':
				currentContent = <Login {...this.props}/>
				break;

			case 'Register':
				currentContent = <Register {...this.props}/>
				break;
		}


		return (
			<div className="landing-page-container">

				<Navbar
					{...this.props}
					changeToLandingPage={this.changeToLandingPage}
					changeToAboutPage={this.changeToAboutPage}
					changeToLearnPage={this.changeToLearnPage}
					changeToBugPage={this.changeToBugPage}
					changeToLoginPage={this.changeToLoginPage}
					changeToRegisterPage={this.changeToRegisterPage}
					userid={this.props.userid}
					username={this.props.username}
				/>


				{currentContent}
				<Footer />
			</div>
		)
	}
}