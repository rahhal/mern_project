const validator= require("validator");
const isEmpty = require("./isEmpty");

module.exports = function  validateLogin(data)
{
    let errors= {};
    var mail = data.email;
    var pwd = data.password;

    mail = !isEmpty(mail) ? mail : '';
    pwd = !isEmpty(pwd) ? pwd : '';
    

    if(!validator.isEmail(mail)){errors.mail= "error format email";}
    if(validator.isEmpty(mail)){errors.mail= "required email";}
    if(validator.isEmpty(pwd)){ errors.pwd= "required password";}

    return{
    isValid: isEmpty(errors),
    errors,
    };
};