const Controller = require("./Controller");
let User = require("../models/user");
const { validationResult } = require('express-validator');

class UserController extends Controller {

    async GetAllUsers(req, res, next) {
        try {
            let users = await User.find({});
            res.status(200).render("./users/list", {
                users: users
            });
        } catch (error) {
            next(error);
        }
    }

    async CreateUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(error => error.msg);
                req.flash("errors", myErrors);
                return res.redirect("/users");
            }

            let newUser = new User(req.body);
            await newUser.save();


            req.flash("success", "کاربر مورد نظر با موفقیت اضافه شد");
            return res.redirect("/users");
        } catch (error) {
            next(error);
        }
    }

    async GetUserById(req, res, next) {
        try {
            let userId = req.params.id;
            var user = await User.findOne({ _id: userId });
            if (!user) {
                this.showError("کاربر مورد نظر یافت نشد" , 404);
            }
            else {
                res.status(200).render("./users/single", { user: user });
            }

        } catch (error) {
            next(error);
        }
    }

    async UpdateUser(req, res, next) {
        try {
            await User.updateOne({ _id: req.params.id }, { $set: req.body });
            req.flash("success", "کاربر با موفقیت ویرایش شد");
            return res.redirect("/users");
        } catch (error) {
            next(error);
        }
    }

    async DeleteUser(req, res, next) {
        try {
            await User.deleteOne({ _id: req.params.id });
            return res.redirect("/users");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController;