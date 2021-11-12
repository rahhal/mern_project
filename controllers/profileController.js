


const profiles = require('../models/profile');
const validateProfile = require('../utiles/profile');
const users = require('../models/user');
const validateExperience = require('../utiles/experience');
const validateEducation = require('../utiles/education');
const StatusCodes = require('http-status-codes');


const addProfile = async(req, res)=>{
    const {isValid, errors} = validateProfile (req.body);
    if(!isValid)
    { 
        res.status(404).json(errors);}
    else
    {
        const allFields ={};

        allFields.user = req.user.id;

        if(req.body.username)
        {
            allFields.username = req.body.username;
        }
        if(req.body.country)
        {
            allFields.country = req.body.country;
        }
        if(typeof req.body.skills != undefined)
        {
            allFields.skills = req.body.skills.split(",");
        }
        if(req.body.website)
        {
            allFields.website = req.body.website;
        }
        if(req.body.bio)
        {
            allFields.bio = req.body.bio;
        }

        allFields.socials ={};
        if(req.body.linkedIn)
        {
            allFields.socials.linkedIn = req.body.linkedIn;
        }
        if(req.body.github)
        {
            allFields.socials.github = req.body.github;
        }

        profiles.findOne({ username: req.body.username})
                .then((profile) =>{
                if(profile)
                    { profiles.findOneAndUpdate(
                                                { user: req.user.id},
                                                { $set: allFields} ,
                                                { new : true } )
                             .then((result) => res.json(result));
                    }
                else
                {
                    profiles.findOne({ username: req.body.username}).then((user)=>
                    {
                        // if(user){
                        //     errors.username = "sorry, user exist";
                        //     res.status(404).json(errors);
                        // }
                        // else
                        // {
                            const newProfile = new profiles(allFields);
                            newProfile.save().then((profile_result) => res.json(profile_result));
                        // }
                    })
                }

        });
    }

    };

const getProfile = (req, res) => {
        const errors = {};
        profiles.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])

                .then((profile) => {

                            if (!profile) {
                            errors.profile = "no profile";
                            res.status(404).json(errors);
                            }
                             else {
                            res.json(profile);
                            }
                        })
                .catch((err) => res.status(500).json(err));
 };
  
 const getUsername = (req, res) => {
    const errors = {};
    profiles.findOne({ username: req.params.username })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.profile = "no profile linked to this username";
          res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch((err) => res.status(500).json(err));
  };
  
  const getAllProfile = (req, res) => {
    const errors = {};
    profiles.find()
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.profile = "no profile exists";
          res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch((err) => res.status(500).json(err));
  };

  const DeleteProfile = (req, res) => {
    profiles.findOneAndRemove({ user: req.user.id }).then(() => {
      users.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  };
  const addExperience = (req, res) => {
    const { errors, isValid } = validateExperience(req.body);
    if (!isValid) {
      res.status(StatusCodes.BAD_REQUEST).json(errors);
    } else {
      profiles.findOne({ user: req.user.id }).then((profile) => {
        const experience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description,
        };
        profile.experience.unshift(experience);
        profile.save().then((result) => res.json(result));
      });
    }
  
  };
  const addEducation = (req, res) => {
    const { errors, isValid } = validateEducation(req.body);
    if (!isValid) {
      res.status(StatusCodes.BAD_REQUEST).json(errors);
    } else {
      Profiles.findOne({ user: req.user.id }).then((profile) => {
        const education = {
          school: req.body.school,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description,
        };
        profile.education.unshift(education);
        profile.save().then((result) => res.json(result));
      });
    }
  
  };
  const deleteExperience = (req, res) => {
    let errors = {};
    profiles.findOne({ user: req.user.id })
      .then((profile) => {
        const indexExperience = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.id);
        if (indexExperience > -1) {
          profile.experience.splice(indexExperience, 1);
          profile.save().then((result) => res.status(StatusCodes.OK).json(result));
        } else {
          errors.message = "no experiences found";
          return res.status(StatusCodes.NOT_FOUND).json(errors);
        }
      })
      .catch((err) => {
        res.status(StatusCodes.NOT_FOUND).json(err);
      });
  };
  const deleteEducation = (req, res) => {
    let errors = {};
    profiles.findOne({ user: req.user.id })
      .then((profile) => {
        const indexEducation = profile.education
          .map((item) => item.id)
          .indexOf(req.params.id);
        if (indexEducation > -1) {
          profile.education.splice(indexEducation, 1);
          profile.save().then((result) => res.status(StatusCodes.OK).json(result));
        } else {
          errors.message = "no educations found";
          return res.status(StatusCodes.NOT_FOUND).json(errors);
        }
      })
      .catch((err) => {
        res.status(StatusCodes.NOT_FOUND).json(err);
      });
  };
  
module.exports = {
    addProfile, 
    getProfile,
    getUsername,
    getAllProfile,
    DeleteProfile,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation

};