const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    adhaarid : {type:Number,required:true},
    gender : {type:String,required:true},
    dob : {type:String,required:true},
    email : {type:String,required:true},
    image : {type:String,required:true},
    name : {type:String,required:true},
    phone : {type:Number,required:true},


})

module.exports = mongoose.model("Patient" , patientSchema)

