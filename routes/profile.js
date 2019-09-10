const router = require('express').Router();

const User = require('../../models/User');

const verifyToken = require('../../middleware/routes/verifyToken');


router.get('/profile/:userid', (req, res, next) => {

	User.findOne({_id: req.sanitize(req.params.userid)},'_id username postCount agreeVotes disagreeVotes', (err, user) => {

		if (err)
		{
			err.message = 'Couldn\'t find any user with the associated id.'
			return next(err);
		}
		res.json(user);
	})
})


// ==== Delete a user route ==== //
router.post('/profile/:userid', verifyToken, (req, res, next) => {

	var sanitizedUserId = req.sanitize(req.params.userid);

	User.findOne({_id: sanitizedUserId}, (err, user) => {

		if (err)
		{
			err.message = 'Couldn\'t find any user with the associated id.';
			return next(err);
		}

		if (res.locals.user.username !== user.username)
		{
			err.message = 'You are not authorized to delete this user.';
			return next(err);
		}

		User.findByIdAndRemove(sanitizedUserId, err => {

			if (err)
			{
				err.message = 'Error occurred while trying to delete user with username of: ' + user.username;
				return next(err);
			}

			res.redirect('/');
		})
	})
})

module.exports = router;