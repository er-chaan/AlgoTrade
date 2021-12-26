var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', function (req, res) {
    res.send('respond with a resource');
});

router.put('/', function (req, res) {
    res.send('respond with a resource');
});

router.delete('/', function (req, res) {
    res.send('respond with a resource');
});


module.exports = router;
