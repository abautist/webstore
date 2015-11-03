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

router.post("/completed", function(req, res) {
	var stripeToken = req.body.stripeToken;
	var product = req.body.product;

	var charge = {
		amount: 3000,
		currency: "usd",
		card: stripeToken
		};

	console.log(stripeToken);

	stripe.charges.create(charge, 
		function(err, charge) {
			if (err && err.type === 'StripeCardError') {
	    		console.log("Error Error");
	  		} else {
	  			console.log('Successful charge sent to Stripe!');

	  			db.sale.findOrCreate({
	  				where: {
	  					name: product
	  				},
	  				defaults: {
	  					name: name,
	  					price: charge.amount,
	  					stripeToken: charge.card,
	  					userId: 1
	  				}
	  			}).spread(function(sale, created) {
	  				console.log(sale.get());
	  		});
	  	}	
		res.render("payments/show");
	});
});



module.exports = router;