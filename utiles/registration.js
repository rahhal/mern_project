const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistration(data) {
  let errors = {};
  var nm= data.name;
  var mail= data.email ;
  var pwd = data.password;

  nm = !isEmpty(nm) ? nm : "";
  mail = !isEmpty(mail) ? mail : "";
  pwd = !isEmpty(pwd) ? pwd : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";

  if (validator.isEmpty(nm)) {
    errors.name = "required name";
  }
  if (!validator.isEmail(mail)) {
    errors.email = "error format email";
  }
  if (validator.isEmpty(mail)) {
    errors.email = "required email";
  }

  if (validator.isEmpty(pwd)) {
    errors.password = "required password";
  }

  return {
    isValid: isEmpty(errors),// sans erreur
    errors,  //avec des erreurs
  };
};
