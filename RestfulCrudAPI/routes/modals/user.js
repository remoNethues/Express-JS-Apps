const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:String
});

module.exports=mongoose.model('crud',userSchema);