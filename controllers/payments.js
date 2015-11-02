var express = require("express");
var router = express.Router();

var stripe = require('stripe')(process.env.TEST_SECRET_KEY);


router.route("/")
	.get(function(req,res) {
		res.render("payments/index");
	})
	.post(function(req,res) {
	var stripeToken = req.body.stripeToken;

	var charge = stripe.charges.create({
	  amount: 1000, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Example charge"
	}, function(err, charge) {
	if (err && err.type === 'StripeCardError') {
	    console.log("Error Error");
	  }
	});
	console.log(charge);
	res.redirect("/");
});

module.exports = router;