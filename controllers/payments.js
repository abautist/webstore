var express = require("express");
var router = express.Router();
var db = require('./../models');

var stripe = require('stripe')(process.env.TEST_SECRET_KEY);


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

module.exports = router;

// 	.post(function(req,res) {
// 	var stripeToken = req.body.stripeToken;

// 	var charge = stripe.charges.create({
// 	  amount: 1000, // amount in cents, again
// 	  currency: "usd",
// 	  source: stripeToken,
// 	  description: "Example charge"
// 	}, function(err, charge) {
// 	if (err && err.type === 'StripeCardError') {
// 	    console.log("Error Error");
// 	  }
// 	});
// 	console.log(charge);
// 	res.redirect("/");
// });