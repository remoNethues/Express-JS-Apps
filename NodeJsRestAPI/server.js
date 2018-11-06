const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const User=require('./Model/userModel');
const path=require('path');
const app=express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));

mongoose.connect('mongodb://localhost:27017/CrudDb');
app.listen(3000,()=>{
    console.log('API Secessfully Listining on Port 3000');
});


//Retrive Request
app.get('/users',(req,res,err)=>{
    
    if(err){ console.log('Error Connecting'+err); }
    User.find((err, user)=>{
        if (err) {
            console.log(err);
        }
        // res.json(user);
        res.render('./Views/index',{user:user});
    });
});

//Create Request 
app.post('/users',(req,res,err)=>{
    if(err){
        console.log(err);
    }
    // console.log("Req", req.body);
    User.create({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email
    }, (err, user)=>{
        if(err)
            console.log(err);
        User.find((err,user)=>{
            if(err)
                console.log(err);
            res.json(user);
        });
    });
});


//Update RFequest With an id
app.put('/users/:id',(req,res,err)=>{
    if(err) console.log(err);
    User.findById(req.params.id,(err,user)=>{
        user.update(req.body,(err,user)=>{
            if(err){
                console.log(err);
            }
            User.find((err,user)=>{
                if(err)
                    console.log(err);
                res.json(user);
            });
        });
    });
});

//Delete request
app.delete('/users/:id',(req,res,err)=>{
    if(err) console.log(err);
    User.deleteOne({
        _id:req.params.id
    },(err,user)=>{
        if(err){
            console.log(err);
        }
        User.find((err,user)=>{
            if(err) console.log(err);
            res.json(user);
        });
    });
});