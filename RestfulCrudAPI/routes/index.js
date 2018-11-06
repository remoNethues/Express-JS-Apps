var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/CrudDb';

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('check');
  res.render('index');
});

router.get('/get-data', function (req, res, next) {
  var resultArray = [];
   mongo.connect(url,{useNewUrlParser:true}, function (err, db) {
    if(err){console.log(err);}
      console.log('check');
      assert.equal(null, err);
      console.log(db);
      var dbo = db.db('cruds');
      var cursor = dbo.find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      db.close();
      res.render('index', { items: resultArray });
    });
   });
});

// router.post('/insert',{useNewUrlParser:true}, function (req, res, next) {
//   var item = {
//     name: req.body.name,
//     age: req.body.age,
//   };

//   mongo.connect(url, function (err, db) {
//     assert.equal(null, err);
//     db.collection('cruds').insertOne(item, function (err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });

//   res.redirect('/');
// });

// router.post('/update',{useNewUrlParser:true}, function (req, res, next) {
//   var item = {
//     name: req.body.name,
//     age: req.body.age,
//   };
//   var id = req.body.id;

//   mongo.connect(url,{useNewUrlParser:true}, function (err, db) {
//     assert.equal(null, err);
//     db.collection('cruds').updateOne({ "_id": objectId(id) }, { $set: item }, function (err, result) {
//       assert.equal(null, err);
//       console.log('Item updated');
//       db.close();
//     });
//   });
// });

// router.post('/delete/:id', function (req, res, next) {
//   var id = req.params.id;
  
//   mongo.connect(url,{useNewUrlParser:true}, function (err, db) {
//     assert.equal(null, err);
//     db.collection('cruds').deleteOne({ "_id": objectId(id) }, function (err, result) {
//       assert.equal(null, err);
//       console.log('Item deleted');
//       db.close();
//     });
//   });
// });

module.exports = router;
