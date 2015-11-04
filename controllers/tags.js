var express = require('express');
var db = require('./../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.tag.findAll({
    include: [db.product]
  }).then(function(tags) {
    res.render('tags/index', {tags: tags});
  });
});

module.exports = router;