var express = require('express');
var app = express();

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// app.use(express.static(__dirname + '/static'));

var stripe = require('stripe')('sk_test_YcNgwCy9ZqMPTd096lJotvcY');


app.set('view engine', 'ejs');


app.get('/', function(req,res) {
	res.render('index');
});

app.use("/payments", require("./controllers/payments"));

app.listen(3000, function() {
	console.log('Port 3000 is live');
});