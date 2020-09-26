const express = require("express");
const router = express.Router();
const config = require("../config");


router.use("/", require("./home"));

router.use("/dashboard", require("./dashboard"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.all("*", (req, res, next) => {
    try {
        let error = new Error("صفحه مورد نظر یافت نشد!");
        error.status = 404;
        throw error;
    } catch (error) {
        next(error)
    }
});

router.use(async (error, req, res, next) => {
    const code = error.status || 500;
    const message = error.message || "";
    const stack = error.stack || "";

    if (config.debug) {
        return res.render("./errors/developer", { code, message, stack });
    }
    else {
        return res.render("./errors/" + code, { message });
    }
});

module.exports = router;