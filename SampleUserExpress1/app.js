var express = require('express');
var app = express();
var things = require('./route');
console.log("router imported");
console.log(things);


app.use('/things', things);
app.listen(3000);