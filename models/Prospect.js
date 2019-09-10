const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prospectSchema = new Schema({

	email: {
		required: true,
		type: String
	},

	ip: {
		unique: true,
		type: String
	}

})

module.exports = mongoose.model('prospect', prospectSchema);