const express = require("express");
const router = express.Router();
const homeController = require("../controllers/HomeController");


router.get("/", homeController.index);

router.get("/paymentCallBack", homeController.paymentCallBack);

const User = require("../models/user");
const map = require("../models/map");
const mongoose = require("mongoose");
const { updateOne } = require("../models/user");
router.get("/test", async (req, res, next) => {
    User.
        findOne({ _id: "5f6ccedbd484be10dc167e88" }).
        populate('maps').
        exec(function (err, user) {
            console.log(user.maps);
        });


});

module.exports = router;