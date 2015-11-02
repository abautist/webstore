var express = require("express");
var router = express.Router();
var db = require('./../models');


router.get("/", function(req,res) {
	db.product.findAll().then(function(product) {
		res.render("products/index", {product: product});
	});
});

module.exports = router;