

// creating schema for patient 

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name : {
       type : String,
       required : [true, "Please enter patient name.."],
       unique : true
    },
    report : [
        {
            status : {
                type : String,
                required : true,
                enum : ["Negative","Travelled-Quarantine","Symptoms-Quarantine","Positive-Admit"],
                date : {
                    type: Date,
                    required : true
                }
            }
        }
    ],
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Doctor"
    }
});



// creating models and exporting them 
const Patient = new mongoose.model("Patient" , patientSchema);
module.exports = Patient;



