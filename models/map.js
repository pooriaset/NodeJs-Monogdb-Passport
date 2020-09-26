const mongoose= require("mongoose");

const mapSchema  = new mongoose.Schema({
    latitude : {type : Number},
    longitude : {type : Number},
    user : {type : mongoose.Schema.Types.ObjectId , required: true , ref :"User"}
});

module.exports = mongoose.model("Map" , mapSchema);
