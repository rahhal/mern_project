const isEmpty = require("./isEmpty");

const validator = require("validator");

module.exports = validateExperience(data)
{
 let errors = {};
    const school = !isEmpty(data.school) ? data.school : "";
    const from = !isEmpty(data.from) ? data.from : "";
    const to = !isEmpty(data.to) ? data.to : "";
    const to = !isEmpty(data.to) ? data.to : "";

    if(validator.isEmpty(school))
        {errors.school = "school required";}
    
    if(validator.isEmpty(from))
        {errors.from = "from required";}
     if(validator.isEmpty(to))
        {errors.to = "to required";}
return({
isValid: isEpmpty(errors),
errors
});
};
