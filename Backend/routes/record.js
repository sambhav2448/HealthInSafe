const express = require('express')
const {check,body} = require('express-validator');

const recordControllers = require('../controllers/record-controllers')

const router = express.Router();


router.get('/getrecords',recordControllers.getAllRecords);


router.post('/',recordControllers.createRecord)




 module.exports = router;