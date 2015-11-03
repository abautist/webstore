var express = require('express');
var app = express();

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	res.render('index');
});

app.use("/payments", require("./controllers/payments"));
app.use("/products", require("./controllers/products"));

app.listen(port, function() {
	console.log('Port 3000 is live');
});