const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encryptionTools = require('../middleware/db/hashpw');
const createHashAndSalt = encryptionTools.saltHashPassword;
const checkEncryption = encryptionTools.checkEncrypted;

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		min: 4
	},
	passwordHash: String,
	salt: String,
	email: {
		type: String,
		unique: true
	},
	ipAddress: String,

	memoryLocationCount: Number
})


const User = mongoose.model('User', userSchema);



// registers user, cb format is: cb(err, user)
User.register = function (username, password, email, ipAddress, cb) {
	
	// perform email/password validation here
	if (password.length <= 5)
	{
		const errObj = {};
		errObj.message = 'Password length not supported.';
		return cb(errObj);
	}

	const passObj = createHashAndSalt(password);

	User.create({
		username,
		passwordHash: passObj.passwordHash,
		salt: passObj.salt,
		email,
		ipAddress,
		memoryLocationCount: 0
	}, (err, user) => {

		if (err) return cb(err); // if err (from ineligible registration, msg will be informative for user)

		var userObj = constructUserObj(user);

		return cb(null, userObj);

	})
}


// checks that submitted password is correct
// cb format is: cb(didPass, user)
User.authenticate = function (username, password, cb) {

	User.findOne({ username: username }, (err, user) => {

		if (err) return cb(err); // if err just return err

		if (!user) return cb(constructError('Invalid login credentials provided.', 401)) // if a user doesn't exist return err

		if (checkAuth(password, user.salt, user.passwordHash)) // conduct authentication check
		{
			var userObj = constructUserObj(user);
			return cb(null, userObj)
		}

		// this code shouldn't be reached
		cb(constructError('Invalid login credentials provided.', 401))

	})
}

module.exports = User;


/*

Helper Function

*/

function checkAuth(submittedPassword, salt, hashToMatch) {

	const resultingHash = checkEncryption(submittedPassword, salt).passwordHash;

	if (resultingHash === hashToMatch) return true;

	else return false;
}

function constructUserObj(user) {

	const userObj = {
		username: user.username,
		_id: user._id
	}

	return userObj;
}

function constructError(message, statusCode) {
	var errObj = {
		message,
		statusCode
	}

	return errObj;
}