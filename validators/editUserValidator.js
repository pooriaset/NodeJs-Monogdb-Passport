const Validator = require("./Validator");
const { check } = require('express-validator');
const path = require("path");
class EditUserValidator extends Validator {
    handle() {
        return [
            check("file", "فایلی وارد نشده است!").notEmpty(),
            check("file").custom(async value => {
                if (!value) {
                    return;
                }

                if (![".jpg", ".jpeg", ".png"].includes(path.extname(value))) {
                    throw new Error("تصویر وارد شده مجاز نیست!");
                }

            })
        ];
    }
}

module.exports = new EditUserValidator;