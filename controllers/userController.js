const Users = require("../models/user");
var bcrypt = require("bcryptjs");
const validateRegistration = require("../utiles/registration");
const validateLogin = require("../utiles/login");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const addUser = async (req, res) => {
  const { isValid, errors } = validateRegistration(req.body);
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    await Users.findOne({ email: req.body.email }).then((result) => {
      if (result) {
        res.status(404).json({ email: "user exist" });
      } else {
        const user = new Users(req.body);
        var hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;
        user.avatar = gravatar.url(req.body.email);
        // user.avatar = gravatar.url(
        //   req.body.email,
        //   { s: "100", r: "x", d: "retro" },
        //   true
        // );
        user
          .save()
          .then(() => res.json({ message: "user added with success" }))
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
};

const loginUser = async(req,res) =>{ 
    const {isValid, errors} = validateLogin (req.body);

    if (!isValid) {
        res.status(404).json(errors);
      } 
    else 
    {
        Users.findOne({ email: req.body.email }).then((user) => {
          if (!user) {
            res.status(404).json({ email: "user not exist" });
          } else {
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
              if (!isMatch) {
                res.status(404).json({ password: "incorrect password" });
              } 
             else
             //{res.send("welcome");}
             { 
                 const payload ={
                 id: user.id,
                 email: user.email
             };
             jwt.sign( payload, process.env.SECRET, {expiresIn: 3600 }, (err, token)=>{
                res.json({
                    success: true,
                    token: token,
                })
                });

             }
            });
          }
        });
    }

};
module.exports = {
  addUser, loginUser
};
