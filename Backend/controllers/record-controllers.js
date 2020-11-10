const HttpError = require("../models/http-error")
const { validationResult } = require('express-validator');
const Record = require('../models/patientRecord');
const mongoose = require("mongoose");


const getAllRecords = async (req,res,next)=>{
    let recordlist;
  try {
    recordlist = await Record.find();
  } catch (err) {
    return next(new HttpError("Could not get all Records", 500));
  }

  res
    .status(200)
    .json({ RecordList: recordlist.map((u) => u.toObject({ getters: true })) });

};






const createRecord = async (req,res,next)=>{
    const { P_dob ,P_name, D_name, upload_date, tags,report_link,med_name,dosage,remarks,timing } = req.body;

    const createdRecord = new Record({
        P_dob ,
        P_name, 
        D_name, 
        upload_date, 
        tags,
        report_link,
        prescription:[{
            med_name,
            dosage,
            remarks,
            timing
        }]
       
      });


      try {
        await createdRecord.save();
      } catch (err) {
        const error = new HttpError("Adding Record failed , try again", 500);
        return next(error);
      }
    
      res.status(201).json({ Record: createdRecord.toObject({ getters: true }) });



  };






  exports.getAllRecords=getAllRecords;
  exports.createRecord=createRecord;
 