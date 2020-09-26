const Controller = require("./Controller");
let User = require("../models/user");
let Transaction = require("../models/transaction");
const { validationResult } = require('express-validator');
const axios = require("axios");


class DashboardController extends Controller {

    async index(req, res, next) {
        try {
            res.render("./index");
        } catch (error) {
            next(error);
        }
    }
    async paymentCallBack(req, res, next) {
        try {
            if (req.query.Status && req.query.Status !== "OK") {
                return res.send("تراکنش ناموفق");
            }

            let transaction = await Transaction.findOne({ resultNumber: req.query.Authority });
            if (!transaction) {
                return res.send("تراکنش ناموفق");
            }

            let params = {
                MerchantID: process.env.ZARINPAL_MERCHANTID,
                Amount: transaction.amount,
                Authority: req.query.Authority
            };

            const response = await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json", params);

            if (response.data.Status === 100) {
                let balance = transaction.amount;
                let user = await User.findById(transaction.userId);
                if (user.balance) {
                    balance += user.balance;
                }
                user.balance = balance;
                transaction.IsFinally = true;

                await user.save();
                await transaction.save();

                res.redirect("/dashboard");
            }
            else {
                return res.send("تراکنش ناموفق");
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DashboardController;