var express = require("express");
var passport = require('passport');
var db = require("../models");
var router = express.Router();


router.route("/signup")
	.get(function (req,res) {
		res.render("auth/signup");
	})
	.post(function (req,res) {
		if (req.body.password !== req.body.password2) {
			req.flash("error", "Passwords must match!");
			res.redirect("/auth/signup");
		} else {
			db.user.findOrCreate({
				where: {
					email: req.body.email
				},
				defaults: {
					email: req.body.email,
					password: req.body.password,
					name: req.body.username
				}
			}).spread(function(user, created){
				if (created) {
					req.flash("success", "You are signed up");
					res.redirect("/");
				} else {
					req.flash("danger", "A user with that email already exists");
					res.redirect("/auth/signup");
				}
			}).catch(function(err) {
				req.flash("error", "an error occured");
				res.redirect("/auth/signup");
			});
		}
	});

router.route("/login")
	.get(function(req,res) {
		res.render("auth/login");
	})
	.post(function(req,res) {
		passport.authenticate('local', function(err, user, info) {
      if (user) {
        req.login(user, function(err) {
          if (err) throw err;
          req.flash('success', 'You are now logged in.');
          res.redirect('/');
        });
      } else {
        req.flash('danger', 'Error');
        res.redirect('/auth/login');
      }
    })(req, res);
  });	

router.get('/login/:provider', function(req,res) {
	passport.authenticate(
		req.params.provider,
		{scope: ['public_profile', 'email']}
	)(req, res);
});

router.get('/callback/:provider', function(req,res) {
	passport.authenticate(req.params.provider, function(err, user, info) {
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in with ' + req.params.provider);
        res.redirect('/');
      });
    } else {
      req.flash('danger', 'Error');
      res.redirect('/auth/login');
    }
  })(req, res);
});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("info", "You have been logged out");
	res.redirect("/");
});

module.exports = router;