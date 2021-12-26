var express = require('express');
var router = express.Router();
var dbConn = require('../db');


router.post('/getChartData', function (req, res) {
    dbConn.query("SELECT * FROM `"+req.body.table+"`", function (error, results) {
        if (error) {
            return res.status(400).send({ status: 'fail', message: error.message });
        }
        if (results) {
            return res.status(200).send({ status: 'success', data: results });
        }
    });
});

router.get('/', function (req, res) {
    dbConn.query("SELECT * FROM 1_instruments ORDER BY id DESC", function (error, results) {
        if (error) {
            return res.status(400).send({ status: 'fail', message: error.message });
        }
        if (results) {
            return res.status(200).send({ status: 'success', data: results });
        }
    });
});

router.get('/:id', function (req, res) {
    dbConn.query("SELECT * FROM 1_instruments WHERE ?", [{ id: req.params.id }], function (error, results) {
        if (error) {
            return res.status(400).send({ status: "fail", message: error.message });
        }
        if (results) {
            return res.status(200).send({ status: "success", data: results });
        }
    });
});

router.post('/', function (req, res) {
    var sql = `
        INSERT INTO 1_instruments (symbol, instrumentCode, feedCode, lastCandleUpdate, status) 
        VALUES ('`+ req.body.symbol.trim() + `', '` + req.body.instrumentCode.trim() + `','` + req.body.feedCode.trim() + `','` + req.body.lastCandleUpdate + `','` + req.body.status + `'  )`;
    dbConn.query(sql, function (error, results, fields) {
        if (error) {
            return res.status(400).send({ status: "fail", message: error.message });
        }
        if (results.insertId) {
            return res.send({ status: "success", data: results.insertId, message: 'Create Success !' });
        } else {
            return res.status(400).send({ status: "fail", message: 'Create Fail !' });
        }
    });
});

router.put('/:id', function (req, res) {
    if (!req.params.id) {
        return res.status(400).send({ status: false, message: 'Invalid Operation' });
    }
    dbConn.query("UPDATE 1_instruments SET ? WHERE ?", 
        [{symbol:req.body.symbol.trim(),instrumentCode:req.body.instrumentCode.trim(),feedCode:req.body.feedCode.trim()}, { id: req.params.id }], function (error, results, fields) {
        if (error) {
            return res.status(400).send({ status: "fail", message: error.message });
        }
        if (results.affectedRows) {
            return res.status(200).send({ status: "success", message: "Update Success !" });
        }
        if (!results.affectedRows) {
            return res.status(400).send({ status: "fail", message: "Update Failed !" });
        }
    });
});

router.delete('/:id', function (req, res) {
    dbConn.query("DELETE FROM 1_instruments WHERE ?", [{ id: req.params.id }], function (error, results) {
        if (error) {
            return res.status(400).send({ status: "fail", message: error.message });
        }
        if (results.affectedRows) {
            return res.status(200).send({ status: "success", message: "Delete Success !" });
        }
        if (!results.affectedRows) {
            return res.status(200).send({ status: "fail", message: "Delete Failed !" });
        }
    });
});

module.exports = router;
