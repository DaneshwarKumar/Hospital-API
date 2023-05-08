
const express = require('express');
const router = express.Router();
const Doctor = require("../Models/doctor");
const Patient = require("../Models/patient");
const jwt = require('jsonwebtoken');
const secretKey = "HospitalApikey";


// creating home page section
router.get('/' , (req,res) => {
    res.send("<h1> Welcome to Hospital API  </h1>");
});



// authenticating the doctor 
router.post("doctor/login" , (req,res) => {
    const user = {
        id : 1,
        userName : "Daneshwar Kumar",
        password : "Daneshwar@123"
    }
    jwt.sign({user} , secretKey , {expiresIn:'500s'} , (err,token) => {
        res.json({
            token
        })
    })
});


// generating the tokens 
router.post("/profile" , varifyToken, (req,res) => {
   
    jwt.varify(req.token , secretKey , (err,authData) => {
        if(err){
            res.send({result : "Invalid Token"});
        }
        else{
            res.json({
                message : "profile Access Successfully",
                authData
            })
        }
    })
    
});

// function for generating and varifyng the tokens 
function varifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
       const bearer = bearerHeader.split(" ");
       const token = bearer[1];
       req.token = token;
       next();
    }else{
        res.send({
            result : 'Token is Not Valid'
        })
    }
}





// adding the new doctor record 
router.post("/doctor/register" , async(req,res) => {
    try{
        const doctor = new Doctor(req.body);
        const createDoctor = await(doctor.save());
        res.status(201).send(createDoctor);
    }catch(e){res.status(400).send(e)}
});




// adding the new patient record 
router.post("/patient/register" , async(req,res) => {
    try{
        req.body.doctor = '64456edc443ae8e4d3f904cd';
        const patient = new Patient(req.body);
        const createPatient = await(patient.save());
        res.status(201).send(createPatient);
    }catch(e){res.status(400).send(e)}
});



// adding the patient report by id 
router.post("/patient/report/:id" , async(req,res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        req.body.date = Date.now();
        patient.report.push(req.body);
        patient.save();
        res.status(201).send("<h1> Report send successfully </h1>");
    }catch(e){res.status(400).send(e)}
});



// getting all the reports 
router.get("/patient/allreport/:id" , async(req,res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        patient.save();
        res.status(201).send(patient);
    }
    catch(e){res.status(400).send(e)}
});



// getting all the reports on basis of status 
router.get("/patient/getallreport/:id" , async(req,res) => {
    try{
       
        const patient = await Patient.find(
            {
                reports : {eleMatch: {status : req.params.status}}
            }
        );

        patient.save();
        res.status(201).send(patient);
    }
    catch(e){res.status(400).send(e)}
});





module.exports = router;
