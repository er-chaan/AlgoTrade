var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.post('/', function (req, res) {
    let token = req.body.authorization;
    if (!token) {
        return res.status(400).send({ status: 'fail', message: 'Invalid Input !' });
    }
    dbConn.query("UPDATE 1_auth SET ? WHERE ?", [{ authorization: token }, { id: 1 }], function (error, results) {
        if (error) {
            return res.status(400).send({ status: 'fail', message: error.message });
        }
        if (!results.affectedRows) {
            return res.status(400).send({ status: 'fail', message: "Auth Failed" });
        }else{
            return res.send({ status: 'success', message: 'Login success.' });
        }
    });
});

module.exports = router;
