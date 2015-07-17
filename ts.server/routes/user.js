var mongoose = require('mongoose'), db = mongoose.createConnection('localhost',
		'test');

var userSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	lastname : String,
	firstname : String,
});

var User = db.model('User', userSchema);

exports.schema = userSchema;

exports.list = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	User.find(function(err, users) {
		res.send(JSON.stringify(users));
	});
};

var ObjectId = mongoose.Types.ObjectId;

exports.get = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	User.findById({
		"_id" : ObjectId.fromString(req.params.id)
	}, function(err, users) {
		res.send(JSON.stringify(users));
	});
};