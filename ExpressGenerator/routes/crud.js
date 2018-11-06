const express = require('express');
const router = express.Router();
const User = require('./modals/user');
const mongoose = require('mongoose');


//Default GET Request to return all the Data of the DataBase
router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(doc => {
      res.status(200).json({ doc });
    }).catch(err => {
      res.status(500).json({ error: err })
    });
});

//Default Post Request to Populate the dataBase with the Data 
router.post('/', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age
  });
  user.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Data Added to CrudDb Sucessfully",
        createdId: user
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

//Get Request With an id it returns data detched from the database usig teh crudid get method.
router.get('/:crudID', (req, res, next) => {
  //To Send The curdId data if found in the DataBase as a json object
  const id = req.params.crudID;
  User.findById(id)
    .exec()
    .then(doc => {
      console.log("From DataBase" + doc);
      if (doc)
        res.status(200).json({ doc });
      else
        res.status(404).json({ message: "No valid data found" });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({ error: err });
    });
});

//Patch (Update) request with an id
router.patch('/:crudID', (req, res, next) => {
  const id = req.params.crudID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps }).exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//Delete request with an id
router.delete('/:crudID', (req, res, next) => {
  const id = req.params.crudID;
  User.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});


//Exports
module.exports = router;