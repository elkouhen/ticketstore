/**
 * Module dependencies.
 */

var express = require('express'), 
routes = require('./routes'), 
user = require('./routes/user'), 
trajet = require('./routes/trajet'), 
billet = require('./routes/billet'), 
http = require('http'), 
path = require('path'),
mongodb = require('connect-mongodb');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);

app.options('/users', user.list);
app.get('/users', user.list);
app.options('/users/:id', user.get);
app.get('/users/:id', user.get);

app.options('/trajets', trajet.list);
app.get('/trajets', trajet.list);
app.options('/trajets/:id', trajet.get);
app.get('/trajets/:id', trajet.get);

app.options('/billets', billet.list);
app.get('/billets', billet.list);
app.options('/billets/:id', billet.get);
app.get('/billets/:id', billet.get);
app.options('/billets/user/:id', billet.billetForUser);
app.get('/billets/user/:id', billet.billetForUser);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
