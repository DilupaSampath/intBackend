const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/database');
const users = require('./routs/users');
//mongo db connection
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log("Connected to database : "+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to database : "+err);
});

//create express app
const app = express();
//initialize port
const port = 3000;
//add cors
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

app.listen(port,()=>{
    console.log("Server started on port : "+port);
});
