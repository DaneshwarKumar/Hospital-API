
const express = require('express');
const router = express.Router();
const Doctor = require("../Models/doctor");
const Patient = require("../Models/patient");


// sending the data to doctor
router.post("/doctor/register" , async(req,res) => {
    try{
        const doctor = new Doctor(req.body);
        const createDoctor = await(doctor.save());
        res.status(201).send(createDoctor);
    }catch(e){res.status(400).send(e)}
});




// sending the data to patient
router.post("/patient/register" , async(req,res) => {
    try{
        req.body.doctor = '644266a8fa92fe7458393c4c';
        const doctor = new Patient(req.body);
        const createDoctor = await(doctor.save());
        res.status(201).send(createDoctor);
    }catch(e){res.status(400).send(e)}
});



// getting the report 
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
