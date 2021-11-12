const isEmpty = require("./isEmpty");

const validator = require("validator");

module.exports = validateExperience(data)
{
 let errors = {};
    const title = !isEmpty(data.title) ? data.title : "";
    const company = !isEmpty(data.company) ? data.company : "";
    const location = !isEmpty(data.location) ? data.location : "";
    const from = !isEmpty(data.from) ? data.from : "";
    const to = !isEmpty(data.to) ? data.to : "";

    if(validator.isEmpty(title))
        {errors.title = "title required";}
    if(validator.isEmpty(company))
        {errors.company = "company required";}
    if(validator.isEmpty(from))
        {errors.from = "from required";}
     if(validator.isEmpty(to))
        {errors.tio = "to required";}
return({
isValid: isEpmpty(errors),
errors
});
};
