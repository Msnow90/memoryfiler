import React from 'react';

export default ({ submit }) => {
	return (
		<div>
			<form onSubmit={submit}>

				<div className="col-auto">
					<label className="sr-only" for="inlineFormInputGroup">Username</label>
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text">@</div>
						</div>
						<input type="text" name="username" className="form-control" id="register-username" placeholder="Username" />
						<small id="usernameHelp" className="form-text text-muted">Please choose a unique username with at least 4 characters.</small>
					</div>
				</div>


				<div className="col-auto">
					<label className="sr-only" for="inlineFormInputGroup">Password</label>
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text"><i className="fas fa-user-lock"></i></div>
						</div>
						<input type="password" name="password" className="form-control" id="register-password" placeholder="password" />
					</div>
				</div>



				<div className="col-auto">
					<label className="sr-only" for="inlineFormInputGroup">Email</label>
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text"><i className="fas fa-envelope-open"></i></div>
						</div>
						<input type="email" name="email" className="form-control" id="register-email" placeholder="email" />
					</div>
				</div>

				<div className="button-container">
					<button type="submit" id="register-submit" className="btn btn-lg action-btn">Register</button>
				</div>
			</form>
		</div>
	)
}