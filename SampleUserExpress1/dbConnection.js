var client = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

function Connect(response) {
    client.connect(url, { useNewUrlParser: true }, function (err, data) {
        if (err) throw err;
        console.log("from dbConnection");
        var dbo = data.db("mydb");
        console.log("from dbo");
        // var user1 = [
        //     { name: "rahul", age: 22 },
        //     { name: "hello", age: 21 },
        //     { name: "Gaurav", age: 23 }
        // ];
        // dbo.collection("users").insertMany(user1, function (err, response) {
        //     if (err) throw err;
        //     console.log("data inserted" + response.insertedCount);
        // });        
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result[0].age);
 
            response.json(result);

            // response.json(result.name + " " + result.age);
            // var i;
            // for (i in result){
            //     response.json(result[i].name+result[i].age);
            // };
            data.close();
        });                   
    });
}
module.exports={
    Connect
}
// console.log(connect);