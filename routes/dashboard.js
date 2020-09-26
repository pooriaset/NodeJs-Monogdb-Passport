const express = require("express");
const router = express.Router();
const uploadUserProfile = require("../upload/uploadUserProfile");
const dashboardController = require("../controllers/DashboardController");
const editUserValidatpr = require("../validators/editUserValidator");

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/auth/login")
});


router.get("/", dashboardController.index);

router.post("/editprofile", editUserValidatpr.handle() ,uploadUserProfile.single("file"), (req, res, next) => {
    if (!req.file) {
        req.body.file = null;
    }
    else {
        req.body.file = req.file.filename;
    }
    next();
}, dashboardController.editprofile);


router.post("/pay" , dashboardController.pay);

module.exports = router;