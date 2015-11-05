var express = require('express');
var db = require('./../models');
var router = express.Router();

router.route('/')
	.get(function(req,res) {
		res.render('feast/index')
	})
	.post(function(req,res) {
		db.feast.findOrCreate({
			where: {
				feast: req.body.name
			}, 
			defaults: {
				price: req.body.price,
				image: req.body.image
			}
		});
	}).spread(function(feast, created) {
		console.log(feast.get());
		res.redirect()
	})


('/', function(req, res) {
  db.tag.findAll({
    include: [db.product]
  }).then(function(tags) {
    res.render('tags/index', {tags: tags});
  });
});

module.exports = router;