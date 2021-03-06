var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	cakes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cake'
	}]
});

module.exports = mongoose.model('Cart', schema);