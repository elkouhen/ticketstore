var mongoose = require('mongoose'), user = require('./user'), trajet = require('./trajet'), db = mongoose
		.createConnection('localhost', 'test');

var ObjectId = mongoose.Types.ObjectId;

var User = db.model('User', user.schema);

var Trajet = db.model('Trajet', trajet.schema);

var billetSchema = new mongoose.Schema({
	_id : mongoose.Schema.ObjectId,
	name : String,
	user : [ 'User' ],
	trajet : [ 'Trajet' ]
});

var Billet = db.model('Billet', billetSchema);

exports.list = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	Billet.find({}, function(err, billets) {

		var nb = 0;
		var billetsResult = new Array();
		billets.forEach(function(item) {

			var billet = {};
			billet.name = item.name;

			billetsResult.push(billet);

			User.findById({
				"_id" : item.user[0].oid
			}, function(err, data) {
				console.log(JSON.stringify(data));

				billet.user = data;

				nb++;
				if (nb === 2 * billets.length)
					res.send(JSON.stringify(billetsResult));
			});

			Trajet.findById({
				"_id" : item.trajet[0].oid
			}, function(err, data) {
				console.log(JSON.stringify(data));

				billet.trajet = data;

				nb++;
				if (nb === 2 * billets.length)
					res.send(JSON.stringify(billetsResult));
			});
		});

	});
};

exports.get = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	Billet.findById({
		"_id" : ObjectId.fromString(req.params.id)
	}, function(err, billet) {

		var nb = 0;
		var mybillet = {};
		mybillet.name = billet.name;

		User.findById({
			"_id" : billet.user[0].oid
		}, function(err, data) {
			console.log(JSON.stringify(data));

			mybillet.user = data;

			nb++;
			if (nb === 2)
				res.send(JSON.stringify(mybillet));
		});

		Trajet.findById({
			"_id" : billet.trajet[0].oid
		}, function(err, data) {
			console.log(JSON.stringify(data));

			mybillet.trajet = data;

			nb++;
			if (nb === 2)
				res.send(JSON.stringify(mybillet));
		});

		console.log(JSON.stringify(billet));
	});
};

exports.billetForUser = function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	console.log(JSON.stringify(req.params.id));

	User.findById({
		"_id" : ObjectId.fromString(req.params.id)
	}, function(err, user) {

		console.log(user);
		console.log(user.billets);
		
		var billetResult = new Array();

		for ( var i = 0; i < user.billets.length; i++) {

			console.log(JSON.stringify(user));

			var nb = 0;
			var mybillet = {};
			mybillet.name = billet.name;

			mybillet.user = user;
			billetResult.push(mybillet);

			Trajet.findById({
				"_id" : billet.trajet[0].oid
			}, function(err, data) {
				console.log(JSON.stringify(data));

				mybillet.trajet = data;

				nb++;
				if (nb === user.billets.length)
					res.send(JSON.stringify(mybillet));
			});
		}

	});
};