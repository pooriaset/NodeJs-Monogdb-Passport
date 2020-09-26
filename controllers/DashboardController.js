const Controller = require("./Controller");

//models
let User = require("../models/user");
let Transaction = require("../models/transaction");

const { validationResult } = require('express-validator');
const axios = require("axios");
class DashboardController extends Controller {

    async index(req, res, next) {
        try {
            res.render("./dashboard/index");
        } catch (error) {
            next(error);
        }
    }

    async editprofile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(error => error.msg);
                req.flash("errors", myErrors);
                return res.redirect("/dashboard");
            }

            if (req.file) {

                let userData = req.user;
                userData.image = req.file.filename;

                await User.updateOne({ _id: userData._id }, { $set: userData });
                req.flash("success", "کاربر با موفقیت ویرایش شد");
                return res.redirect("/dashboard");

            }

        } catch (error) {
            next(error);
        }
    }

    async pay(req, res, next) {
        try {

            let params = {
                MerchantID: process.env.ZARINPAL_MERCHANTID,
                Amount: req.body.amount,
                CallbackURL: 'http://localhost:3000/paymentCallBack',
                Description: 'شارژ حساب در سایت تستی NodeJs'
            };

            const response = await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", params);
            if (response.data.Status == 100) {

                let newTransact = new Transaction({
                    userId: req.user._id,
                    resultNumber: response.data.Authority,
                    amount: req.body.amount,
                    IsFinally: false
                });

                await newTransact.save(); 

                res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`);

            }
            else {
                res.redirect("/dashboard");
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new DashboardController;