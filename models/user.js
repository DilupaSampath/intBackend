const mongoose = require('mongoose');
const bcrypt  =require('bcryptjs');


const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = function(newUser,callback){
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    })
});
}
module.exports.getUserById = function(id,callback){
User.findById(id,callback);
}
module.exports.getUserByName = function(username,callback){
const quary = {username:username};
User.findOne(quary,callback);
}
module.exports.comparePassword = function(password,hash,callback){
bcrypt.compare(password,hash,(err,isMatch)=>{
if(err) throw error;
callback(null,isMatch);
});
}