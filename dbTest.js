var db = require("./models");

db.product.create({
	name: 'Hakurei Turnip',
	price: 5000 //price in cents
}).then(function(product) {
	console.log(product.get());
});