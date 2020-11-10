const HttpError = require("../models/http-error")
// const { unlock } = require("../routes/places-routes");
const { validationResult } = require('express-validator');
const Patient = require('../models/patient');
const mongoose = require("mongoose");


const getAllPatient = async (req,res,next)=>{
    let patientlist;
  try {
    patientlist = await Patient.find();
  } catch (err) {
    return next(new HttpError("Could not get all patients", 500));
  }

  res
    .status(200)
    .json({ Patients: patientlist.map((u) => u.toObject({ getters: true })) });

};






const createPatient = async (req,res,next)=>{
    const { adhaarid ,gender, dob, email, name, phone } = req.body;
    let existingUser;
    try {
      existingUser = await Patient.findOne({ email: email });
    } catch (err) {
      return next(
        new HttpError("Could not create patient , incorrect credentials", 500)
      );
    }
  
    if (existingUser) {
      return next(new HttpError("Patient exists already", 422));
    }


    const createdPatient = new Patient({
        adhaarid,
        gender,
        dob,
        email,
        image:
        "https://www.cricket.com.au/-/media/Players/Men/International/India/ODIWC19/Jasprit-Bumrah-CWC19.ashx",
        name,
        phone
      });


      try {
        await createdPatient.save();
      } catch (err) {
        const error = new HttpError("Creating patient failed , try again", 500);
        return next(error);
      }
    
      res.status(201).json({ Patient: createdPatient.toObject({ getters: true }) });



  };






  exports.getAllPatient=getAllPatient;
  exports.createPatient=createPatient;
 