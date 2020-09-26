const { hashSync, compareSync } = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    if (user) {
        done(null, user);
    }
});

passport.use("local.register", new localStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            let user = await User.findOne({ username: req.body.username });
            if (user) {
                return done(null, false, req.flash("errors", "قبلا کاربری با این ایمیل ثبت نام کرده است."));
            }

            const newUser = new User({
                username: req.body.username,
                password: hashSync(req.body.password, 10)
            });

            await newUser.save();
            done(null, newUser, req.flash("success", "با موفقیت عضو شدید!"));
        } catch (error) {
            return done(error, false, { message: error });
        }
    }
));


passport.use("local.login", new localStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            let user = await User.findOne({ username: req.body.username });
            if (!user || !compareSync(req.body.password, user.password)) {
                return done(null, false, req.flash("errors", "نام کاربری یا رمز عبور اشتباه است."))
            }
            done(null, user);

        } catch (error) {
            return done(error, false, { message: error });
        }
    }
));