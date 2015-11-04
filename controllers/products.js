var express = require("express");
var router = express.Router();
var db = require('./../models');


router.get("/", function(req,res) {
	db.product.findAll().then(function(product) {
		res.render("products/index", {product: product});
	});
});

router.route("/:id/tags")
	.get(function(req,res){
		var id = req.params.id;
		db.product.findById(id).then(function(product){
			product.getTags().then(function(tags){
				res.render('products/tags', {tags: tags, product: product});
			});
		});
	})
	.post(function(req,res){
		var id = req.params.id;
		db.tag.findOrCreate({
			where: {
				tag: req.body.tag
			}
		}).spread(function(tag, created) {
			db.product.findById(id).then(function(product){
				product.addTag(tag).then(function() {
					res.redirect('/products/'+id+'/tags');
				});
			});
		});
	});

module.exports = router;