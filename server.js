
const express= require("express");
const app= express();
const Router = require('./router');
require('dotenv').config();
const mongoose= require("mongoose");
const passport = require("passport");

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


/* connexion au base des données */

  const db= process.env.DB;
mongoose.connect(db).then(()=>{console.log("database connected")});

/* init passport */
app.use(passport.initialize());
require("./config/Passport")(passport);

/* ROUTER */
app.use('/api', Router);

/* start server */
const PORT= process.env.PORT;
console.log(PORT);
app.listen(PORT,()=> {
console.log(`server run on port:${PORT}`)
});