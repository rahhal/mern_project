const express= require("express");
const Router= express.Router();
const userController = require('./controllers/userController');
const profileController = require('./controllers/profileController');
const passport = require("passport");




Router.post('/registration', userController.addUser);
Router.post('/login', userController.loginUser);

/*  route profile */
Router.post('/profile',
             passport.authenticate("jwt", { session: false }),
             profileController.addProfile
           );

/* route get profile of user connecté */
Router.get('/profile', 
            passport.authenticate("jwt", { session: false}), 
            profileController.getProfile
        );
/* get profile by username */
 Router.get(
          "/profile/:username",
          passport.authenticate("jwt", { session: false }),
          profileController.getUsername
        );
/* get all profile */
Router.get("/all", profileController.getAllProfile);

/* delete profile and user */
Router.delete( "/profile",
            passport.authenticate("jwt", { session: false }),
            profileController.DeleteProfile
          );
          /* ajout d'experience */
Router.post("/experience",
          passport.authenticate("jwt", { session: false }),
          profileController.addExperience
        );
/* Ajout d'education */
Router.post("/education",
          passport.authenticate("jwt", { session: false }),
          profileController.addEducation
        );
/* delete experience */

Router.delete("/experience/:id",
        passport.authenticate("jwt", { session: false }),
        profileController.deleteExperience
      );
/* delete education */

Router.delete("/education/:id",
        passport.authenticate("jwt", { session: false }),
        profileController.deleteEducation
      );



module.exports= Router;