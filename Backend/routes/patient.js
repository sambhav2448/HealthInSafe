const express = require('express')
const {check,body} = require('express-validator');

const patientControllers = require('../controllers/patient-controllers')

const router = express.Router();


router.get('/allpatients',patientControllers.getAllPatient);


router.post(
    '/'
        ,
        patientControllers.createPatient)




 module.exports = router;