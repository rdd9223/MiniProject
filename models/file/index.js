const mongoose = require('mongoose');

const schema = {
	userId: String,
	fileId: String,
	fileName: String
};

module.exports = mongoose.model('file', schema); 