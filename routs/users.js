const express = require('express');
const router = express.Router();
const config = require('../config/database');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', (req, res, next) => {
let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,

});
User.addUser(newUser,(err,user)=>{
    if(err){
res.json({
        succes: false,
        msg: "Registaton failed..!"
});
    }else{
        res.json({
            succes: true,
            msg: "Registered succesfuly"
    });
    }
});

});
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByName(username,(err,user)=>{
        if(err) throw error;
        if(!user){
            res.json(
                {
                    succes:false,
                    msg:"user Not Found"
                }
            );
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw error;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:60480
                });
                res.json({
                    succes:true,
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        email:user.email
                    }
                });
            }else{
                res.json({
                    succes:false,
                    msg:"Password not matched"
                });
            }
        });
    });

});
router.get('/profile',passport.authenticate("jwt",{session:false}), (req, res, next) => {
    res.json({
user:req.user
    });
});
module.exports = router;