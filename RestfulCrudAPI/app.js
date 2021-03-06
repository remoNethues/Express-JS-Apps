//System imports
const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const crudRoutes= require('./API/Routes/Crud');

//initializing the databse 
mongoose.connect('mongodb://localhost:27017/CrudDb',{ useNewUrlParser:true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

//CORSE error 
app.use((req,res,next)=>{
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization"
        );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH');
            return res.status(200).json({});
        }
    next();
});


//Routes For the project
app.use('/crud',crudRoutes);


//Error handling if 
app.use((req, res, next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message:error.message
    });
})

//Exports
module.exports=app;