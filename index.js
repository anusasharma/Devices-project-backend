
//3rd party packages
// let createError = require('http-errors');
let express = require('express');
// let path = require('path');
// let cookieParser = require('cookie-parser');
// let logger = require('morgan');
let cors = require('cors');

//modules for authentication
// let session = require('express-session');
// let passport = require('passport');


// let passportJWT = require('passport-jwt');
// let JWTStrategy = passportJWT.Strategy;
// let ExtractJWT = passportJWT.ExtractJwt;

// let passportLocal = require('passport-local');
// let localStrategy = passportLocal.Strategy;
// let flash = require('connect-flash');

//Database setup
let mongoose = require('mongoose');
// Importing mongoose module
// var mongoose = require("mongoose");
let port = process.env.PORT || 3000;

const app = express();
app.use(cors())

app.get('/', async (req, res, next) => {
    res.send('Hello')
})

var MongoClient = require('mongodb').MongoClient;


// database setup
let DB = require('./config/db');
let url = DB.URI
// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
    console.log('Connected to MongoDB...');
});
// Handling the get request
app.get("/", async (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Devices");
        dbo.collection("devices").find({}).toArray(function(err, result) {
            console.log(result)
            if (err) throw err;
            res.send(result, 200)
            db.close();
        });
    });
    // res.send("Hello World");
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// Starting the server on the 80 port
app.listen(port, () => {
    console.log(`The application started
  successfully on port ${port}`);
});
