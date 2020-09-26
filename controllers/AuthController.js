const Controller = require("./Controller");
let User = require("../models/user");
const { validationResult } = require('express-validator');
const passport = require("passport");

//initilize google reacptcha
var Recaptcha = require('express-recaptcha').RecaptchaV2;
const options = { 'hl': 'fa' };
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITEKEY, process.env.RECAPTCHA_SECRETKEY, options);

class AuthController extends Controller {

    async registerForm(req, res, next) {
        try {
            res.render("./auth/register", { recaptcha: recaptcha.render() });
        } catch (error) {
            next(error);
        }
    }

    async loginForm(req, res, next) {
        try {
            res.render("./auth/login", { recaptcha: recaptcha.render() });
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        try {

            let recaptchaResult = await new Promise((resolve, reject) => {
                recaptcha.verify(req, (error, data) => {
                    if (error) {
                        req.flash("errors", "تیک گزینه امنیتی را بزنید!");
                        res.redirect("/auth/register");
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });

            if (!recaptchaResult) {
                return;
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(error => error.msg);
                req.flash("errors", myErrors);
                return res.redirect("/auth/register");
            }

            passport.authenticate("local.register", {

                successRedirect: "/dashboard",
                failureRedirect: "/auth/register",
                failureFlash: true

            })(req, res, next);

        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {


            let recaptchaResult = await new Promise((resolve, reject) => {
                recaptcha.verify(req, (error, data) => {
                    if (error) {
                        req.flash("errors", "تیک گزینه امنیتی را بزنید!");
                        res.redirect("/auth/login");
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });

            if (!recaptchaResult) {
                return;
            }


            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(error => error.msg);
                req.flash("errors", myErrors);
                return res.redirect("/auth/login");
            }

            passport.authenticate("local.login", (err, user) => {
                if (!user) {
                    res.redirect("/auth/login");
                }
                req.logIn(user, err => {
                    return res.redirect("/dashboard");
                });
            })(req, res, next);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController;