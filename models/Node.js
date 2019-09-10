const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new Schema({

	ownerName: String,

	nodeIndex: Number,

	title: {
		type: String,
		required: true
	},

	description: String,

	parentMemoryId: {
		type: String,
		required: true
	},

	imageFilePath: String,

	isMemory: Boolean,

	linkedMemory: String,

	left: String,

	top: String
})

module.exports = mongoose.model('node', nodeSchema);