var express = require('express');
var router = express.Router();
var dbconnect = require('./dbConnection');


//
router.get('/', function (req, res) {
    dbconnect.Connect(res);
    console.log("Inside get after db call");
});


//POST Method call
router.post('/', function (req, res) {
    res.send('Post Requested');
});

module.exports = router;