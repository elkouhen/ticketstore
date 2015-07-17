var mongoose = require('mongoose'), db = mongoose.createConnection('localhost',
		'test');

var trajetSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	depart : String,
	arrivee : String
});

var Trajet = db.model('Trajet', trajetSchema);

exports.schema = trajetSchema; 

exports.list = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	Trajet.find(function(err, trajets) {
		res.send(JSON.stringify(trajets));
	});
};

exports.get = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.send(JSON.stringify(trajets[req.params.id]));
};