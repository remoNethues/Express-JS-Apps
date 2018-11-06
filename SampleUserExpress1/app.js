var express = require('express');
var mongoose=require('mongoose');
var app = express();

var things = require('./route');
console.log(things);


app.use('/things', things);
app.listen(3000);