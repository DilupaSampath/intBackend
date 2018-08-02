const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtSrategy = require('passport-jwt').Strategy;
const config  = require('../config/database');
const User = require('../models/user');


module.exports = function(passport){
let opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = config.secret;

passport.use(new JwtSrategy(opts,(jwt_payload,done)=>{

User.getUserById(jwt_payload._id,(err,user)=>{
    if(err){
        return done(err,false);
    }
    if(user){

        return done(null,user);
    }else{
        return done(null,false);
    }
});
}));

}