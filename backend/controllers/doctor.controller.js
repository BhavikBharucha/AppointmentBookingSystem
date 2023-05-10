const DoctorModule = require('../model/doctor.model');

const mongoose = require('mongoose');

module.exports = {
    registerDoctor: async (req, res, next) => {
        try {
            //if(!req.body.firstname){return res.send("No first name")}
            const doctor = new DoctorModule(req.body); //Constructer to moodel

            if(!req.body.firstname || !req.body.lastname || !req.body.specialization || !req.body.contact_number || !req.body.email || !req.body.department)
            {
                return res.send("Please Fill all the fields");
            }

            checkexists_email = await DoctorModule.findOne({email: req.body.email});

            if(checkexists_email)
            {
                console.log(JSON.stringify("Email Already exists!"));
                return res.send(JSON.stringify("Email Already exists!"));
            }else{
                const result = await doctor.save(); //save to insert
    
                if (result) {
                    console.log(result);
                    res.send(JSON.stringify('Doctor Registered Successsfully'));
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    },

    ListAllDoctorDetails: async(req,res,next) => {
        try{
            const result = await DoctorModule.find().select([
                '-password',
                '-__v',
            ]);

            res.send({data: result});
            console.log(result);
        }catch(err){
            console.log(err);
        }
    },

    ListAllActiveStatusDoctorsDetails: async(req,res,next)=>{
        try{
            const result = await DoctorModule.find({flag:1})

            if(result){
                res.send({data: result});
            }
        }catch(err){
            console.log(err);
        }
    }
}