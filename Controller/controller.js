
const Doctor = require('../Models/doctor');
const Patient = require('../Models/patient');


// creating doctor coltroller 
module.exports.registerDoctor = async (req,res) => {
    try{
        const doctor = await Doctor.create(req.body);
        res.status(200).json({
            success : true,
            message : "Doctor registerd successfully"
        })
    }
    catch(err){
       res.status(500).json({
        success : false,
        message : "can not register doctor"
       });
    }
}


