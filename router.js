const express= require("express");
const Router= express.Router();
const userController = require('./controllers/userController');
const profileController = require('./controllers/profileController');
const passport = require("passport");




Router.post('/registration', userController.addUser);
Router.post('/login', userController.loginUser);

/*  route profile */
Router.get('/profile',
             passport.authenticate("jwt", { session: false }),
             profileController.profile
           );

/* route compte */
Router.get('/compte', 
            passport.authenticate("jwt", { session: false}), 
            profileController.compte
        );

module.exports= Router;