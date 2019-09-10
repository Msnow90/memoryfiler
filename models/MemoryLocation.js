const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoryLocationSchema = new Schema({

	ownerName: String,

	title: {
		type: String,
		required: true
	},

	description: String,

	childMemories: Array,

	isParent: Boolean,

	imageFilePath: {
		type: String,
		required: true
	},

	childNodes: Array
})

module.exports = mongoose.model('memorylocation', memoryLocationSchema);