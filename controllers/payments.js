var express = require("express");
var router = express.Router();
var db = require('./../models');

var stripe = require('stripe')("sk_test_YcNgwCy9ZqMPTd096lJotvcY");


router.route("/")
	.get(function(req,res) {
		res.render("payments/index");
	})
	.post(function(req,res) {
		db.cart.findOrCreate({
			where: {
				name: req.body.name
			},
			defaults: {
				name: req.body.name,
				price: req.body.price,
				userId: 1
			}
		}).spread(function(cart, created) {
			console.log(cart.get());
			res.render("payments/index", {cart: cart});
		});
});

router.post("/completed", function(req, res) {
	// console.log(process.env.TEST_SECRET_KEY);
	var stripeToken = req.body.stripeToken;

	// db.cart.find({
	// 	where: { 
	// 		name: "Hakurei Turnip"
	// 	}
	// }).then(function(){
		var charge = {
		amount: 1000,
		currency: "usd",
		card: stripeToken
		};
			stripe.charges.create(charge, 
				function(err, charge) {
			if (err && err.type === 'StripeCardError') {
			    console.log("Error Error");
			  }
			});
			res.render("payments/show");
	});
// });

module.exports = router;