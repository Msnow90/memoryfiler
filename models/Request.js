const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({

	category: {
        type: String,
        enum: ['Bug', 'Feature', 'Other']
    },

    content: String

})

module.exports = mongoose.model('request', requestSchema);