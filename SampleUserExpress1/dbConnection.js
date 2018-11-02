var client = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/Nethues";

function Connect() {
    client.connect(url, { useNewUrlParser: true }, function (err, data) {
        if (err) throw err;
        console.log("from dbConnection");
        var dbo = data.db("mydb");
        console.log("from dbo");
        dbo.createCollection("users",function(err,res){
            if (err) throw err;
            console.log("Created Collection");
            data.close();
        });       
    });
}

module.exports={
    Connect
}
// console.log(connect);