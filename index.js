var express = require('express');
var app = express();

var db = require("./models");

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

var session = require("express-session");
app.use(session({
	secret: "aldfjk",
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next){
	if (req.session.user) {
		db.user.findById(req.session.user).then(function(user){
			if (user) {
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
		req.currentUser = false;
		next();
	}
});

var flash = require("connect-flash");
app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req,res) {
	res.render('index');
});

app.use("/auth", require("./controllers/auth"));
app.use("/payments", require("./controllers/payments"));
app.use("/products", require("./controllers/products"));
app.use("/tags", require("./controllers/tags"));

app.listen(port, function() {
	console.log('Port 3000 is live');
});