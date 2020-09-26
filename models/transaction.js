const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionScheme = new Schema({
    userId : {type : Schema.Types.ObjectId , ref : "User"},
    resultNumber : {type : String , required : true},
    amount : {type : Number},
    IsFinally : {type : Boolean}
});

module.exports = mongoose.model("Transaction", transactionScheme, "Transaction");