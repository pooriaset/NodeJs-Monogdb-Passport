const express = require("express");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require('connect-flash');
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const expressLayouts = require('express-ejs-layouts');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 7) },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


app.use(flash());

require("./passport/passportLocal");

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use((req, res, next) => {
    res.locals = {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user : req.user
    };
    next();
});

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
