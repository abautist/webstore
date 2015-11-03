var express = require("express");
var router = express.Router();
var db = require('./../models');


router.get("/", function(req,res) {
	db.product.findAll().then(function(product) {
		res.render("products/index", {product: product});
	});
});

// router.route("/:id/tags")
// 	.get(function(req,res){
// 		var id = req.params.id;
// 		db.product.findById(id).then(function(product){
// 			product.getTags().then(function(tags){
// 				res.render('products/tags', {tags:tags, product: product});
// 			});
// 		});
// 	});

module.exports = router;