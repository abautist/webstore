var express = require('express');
var db = require("./models");
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var session = require("express-session");
var passport = require('passport');
var strategies = require('./config/strategies');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

app.use(session({
	secret: "aldfjk",
	resave: false,
	saveUninitialized: true
}));

var flash = require("connect-flash");
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

passport.use(strategies.localStrategy);
passport.use(strategies.facebookStrategy);

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
app.use("/feast", require("./controllers/feast"));

app.listen(port, function() {
	console.log('Port 3000 is live');
});