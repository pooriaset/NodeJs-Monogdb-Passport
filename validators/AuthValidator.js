const Validator = require("./Validator");
const { check } = require('express-validator');

class AuthValidator extends Validator
{
    login()
    {
        return [check("username", "نام باید حداقل ۳ کاراکتر باشد").isLength({ min: 3 })];
    }

    register() {
        return [check("username", "نام باید حداقل ۳ کاراکتر باشد").isLength({ min: 3 })];
    }
}

module.exports = new AuthValidator;