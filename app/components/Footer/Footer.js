import React from 'react';

import './Footer.css';

export default () => {
	return (
		<div className="footer-container">
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<p>Copyright &copy; M.M. Snow Digital LLC 2019</p>
				</div>
				<div className="col-xs-12 col-md-6">
					<a href="https://twitter.com/filermemory"><i className="fab fa-twitter-square"></i></a>
					<a href='mailto:memoryfiler@gmail.com'><i className="fas fa-envelope"></i></a>
					<a href="https://facebook.com/memoryfiler"><i className="fab fa-facebook-square"></i></a>
				</div>
			</div>
		</div>
	)
}