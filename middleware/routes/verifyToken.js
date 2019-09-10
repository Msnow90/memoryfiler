const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// will return user obj to req.locals.user
module.exports = function (req, res, next) {
	
	var ip = (req.ip === '::1') ? '::ffff:127.0.0.1' : req.ip;
	var token = (!req.body.token) ? req.sanitize(req.headers.authorization) : req.sanitize(req.body.token);

	jwt.verify(token, ip, (err, user) => {

		if (err || !user.username) {
			err.message = 'Unauthorized attempt to access resource.'
			err.statusCode = 401;
			return next(err);
		}

		User.findById(user._id, (err, foundUser) => {

			if (err) {
				err.message = 'Failed to lookup user in the database. Your token may be invalid.';
				err.statusCode = 401;
				return next(err);
			}

			if (!foundUser || !foundUser.username) {
				var err = {};
				err.message = 'Failed to process token.';
				err.statusCode = 401;
				return next(err);
			}

			res.locals.user = user;
			return next();


		})
	})
}