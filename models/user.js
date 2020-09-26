const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema({
    username: { required: true, type: String },
    image: { type: String },
    balance: { type: Number },
    password: { required: true, type: String },
    maps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Map", required: true }]
});

module.exports = mongoose.model("User", userschema, "User");