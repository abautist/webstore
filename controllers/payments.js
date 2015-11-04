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
				req.currentUser.createCart({
					name: req.body.name,
					price: req.body.price
				}).then(function(cart) {
					console.log(cart.get());
					res.render("payments/index", {cart: cart});
				});
			} else {
				req.flash("danger", "You have to login to continue");
				res.redirect("/auth/login");
			}		
		});
});

router.post("/completed", function(req, res) {
	var stripeToken = req.body.stripeToken;
	var stripeEmail = req.body.stripeEmail;
	var userId = req.currentUser.id;


//stripe charge
	db.cart.find({where: {userId: userId}}).then(function(cart) {

		var charge = {
			amount: cart.price*100,
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
		  					userId: userId
		  				}
		  			}).then(function() {
						console.log("cart cleared");
						req.currentUser.createSale({
							email: stripeEmail,
							price: charge.amount,
							stripeToken: stripeToken
						}).then(function(sale) {
							console.log(sale.get());
							res.render("payments/show");
						});
					}).catch(function() {
						console.log("error")
					});			
				}
			});
	});
});

			



module.exports = router;