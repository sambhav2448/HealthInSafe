const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
   
    P_dob : {type:String,required:true},
    P_name : {type:String,required:true},
    D_name:{type:String,required:true},
    upload_date:{type:String,required:true},
    tags:{type:String,required:true},
    report_link:{type:String},
    prescription:[{
        med_name:{type:String},
        dosage:{type:String},
        remarks:{type:String},
        timing:{type:String}
    }]
})

module.exports = mongoose.model("Record" , recordSchema)

