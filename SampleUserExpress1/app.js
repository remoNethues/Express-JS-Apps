//Function imports commands
var express=require('express');
// var client=require().MongoDBClient

var app=express();
app.get('/',function(req,res){
    res.send("hello hell");
});
app.listen(3000);
