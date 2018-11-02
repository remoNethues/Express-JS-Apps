var client = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/Nethues";

function Connect(response) {
    client.connect(url, { useNewUrlParser: true }, function (err, data) {
        if (err) throw err;
        console.log("from dbConnection");
        var dbo = data.db("mydb");
        console.log("from dbo");
        var user1={
            name:"rahul",
            age:22
        };
        dbo.collection("users").insertOne(user1,function(err,response){
            if(err) throw err;
            console.log("data inserted");
        });
        
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result[0].age);
            response.send(result[0].name+result[0].age);
            data.close();
        });                   
    });
}

module.exports={
    Connect
}
// console.log(connect);