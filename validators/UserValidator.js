const Validator = require("./Validator");
const { check } = require('express-validator');

class UserValidator extends Validator
{
    handle()
    {
        return [check("username", "نام باید حداقل ۳ کاراکتر باشد").isLength({ min: 3 })];
    }
}

module.exports = new UserValidator;