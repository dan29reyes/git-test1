var express = require('express');
var router = express.Router();
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/envtest', function(req, res, next){
  res.send({
    env: process.env.WEATHER_API
  })
})

module.exports = router;
