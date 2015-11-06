var express = require('express');
var db = require('./../models');
var router = express.Router();

router.route('/')
	.get(function(req,res) {
		if (!req.session.user) {
			req.flash("danger", "You have to login to continue");
			res.redirect("/auth/login");
		} else {
				db.feast.findAll({
					order: 'id DESC'
				}).then(function(feasts) {
					res.render('feast/index', {feasts: feasts});
			});
		}
	})
	.post(function(req,res) {
		if (!req.session.user) {
			req.flash("danger", "You have to login to continue");
			res.redirect("/auth/login");
		} else {
			db.user.findById(req.session.user).then(function(user) {
				if (user) {
					db.feast.findOrCreate({
						where: { 
							userId: user.id,
							feast: req.body.name
						},
						defaults: {
							userId: user.id,
							feast: req.body.name,
							price: req.body.price,
							image: req.body.image
						}
					}).spread(function(feast, created) {
							res.redirect("/feast")
						});
				} else {
						req.flash("danger", "You have to login to continue");
						res.redirect("/auth/login");
					}		
			});
		}
	});





module.exports = router;