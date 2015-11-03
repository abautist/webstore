var express = require("express");
var router = express.Router();
var db = require('./../models');

var stripe = require('stripe')(process.env.TEST_SECRET_KEY);


router.route("/")
	.get(function(req,res) {
		res.render("payments/index");
	})
	.post(function(req,res) {
		db.user.findById(req.session.user).then(function(user) {
			if (user) {
				req.currentUser = user;
				user.createCart({
					name: req.body.name,
					price: req.body.price
			}).then(function(cart) {
				console.log(cart.get());
				res.render("payments/index", {cart: cart});
				});
			};
		});
	});

router.post("/completed", function(req, res) {
	var stripeToken = req.body.stripeToken;
	var stripeEmail = req.body.stripeEmail;

//stripe charge
	var charge = {
		amount: 3000,
		currency: "usd",
		card: stripeToken
		};
	
	for (var key in req.body) {
		console.log(key+": "+req.body[key]);
	}
	

	stripe.charges.create(charge, 
		function(err, charge) {
			if (err && err.type === 'StripeCardError') {
	    		console.log("Error Error");
	  		} else {
	  			console.log('Successful charge sent to Stripe!');
	  			console.log(stripeToken);
	  			
	  			db.cart.destroy({
	  				where: {
	  					userId: cart.userId
	  				}
	  			}).then(function() {
					console.log("cart cleared");
				}).catch(function() {
					console.log("error")
				});
				db.sale.findOrCreate({
					where: {
						email: stripeEmail
					},
					defaults: {
						email: stripeEmail,
						price: 3000,
						stripeToken: stripeToken,
						userId: sale.userId
				  				}
						}).spread(function(sale, created) {
							console.log(sale.get());
							res.render("payments/show");
						});
				}
	});
});

			



module.exports = router;