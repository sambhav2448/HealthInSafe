const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

app.use(cors())
require('dotenv').config()

const HttpError = require("./models/http-error");
const patientRoutes = require("./routes/patient");
const recordRoutes = require("./routes/record")



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.json({message:"welcome to health in safe"});
})

app.use("/patient", patientRoutes);
app.use("/record", recordRoutes);


app.use((req, res, next) => {
    const error = new HttpError("Could not find the route", 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An uknown error occured" });
  });


  const PORT = 5000;
mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    app.listen(PORT, (req, res) => console.log(`Server started on ${PORT}...`));
  })
  .catch((err) => console.log(err.message));