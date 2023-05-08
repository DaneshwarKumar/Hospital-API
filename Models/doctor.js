

// creating doctor schema
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            requred : [true, "Please enter username...."]
        },
        password : {
            type : String,
            required : [true, "please enter password..."]
        }
    }
);


const Doctor = new mongoose.model("Doctor" , doctorSchema);

module.exports = Doctor;
