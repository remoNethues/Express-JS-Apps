var express = require('express');
var router = express.Router();
var dbconnect = require('./dbConnection');



router.get('/', function (req, res) {
    dbconnect.Connect();
    console.log("Inside get after db call");
    res.send("From GET");
});


//POST Method call
router.post('/', function (req, res) {
    res.send('Post Requested');
});

module.exports = router;