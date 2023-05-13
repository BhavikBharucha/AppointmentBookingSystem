const Jwt = require('jsonwebtoken');
const jwtKey = 'hptl';
const bcrypt = require('bcrypt');

const PatientModule = require('../model/patient.model');

const mongoose = require('mongoose');

module.exports = {
    registerPatient: async (req, res, next) => {
        try {
            //if(!req.body.firstname){return res.send("No first name")}
            const patient = new PatientModule(req.body); //Constructer to moodel

            if(!req.body.firstname || !req.body.lastname || !req.body.date_of_birth || !req.body.gender || !req.body.contact_number || !req.body.email || !req.body.address || !req.body.password)
            {
                return res.send(JSON.stringify("Please Fill all the fields"));
            }

            //Generate salt to hash the password
            const salt = await bcrypt.genSalt(10);

            //now we set user password to hashed password
            patient.password = await bcrypt.hash(patient.password, salt);

            checkexists_email = await PatientModule.findOne({email: req.body.email});

            if(checkexists_email)
            {
                console.log(JSON.stringify("Email Already exists!"));
                return res.send(JSON.stringify("Email Already exists!"));
            }else{
                const result = await patient.save(); //save to insert
    
                if (result) {
                    console.log(result);
                    res.send(JSON.stringify('Patient Registered Successsfully'));
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    },

    ListAllPatientDetails: async (req,res,next) => {
        try {
            const result = await PatientModule.find().select([
                '-password',
                '-__v'
            ]);
            res.send({ data: result });
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },

    login: async (req, res, next) => {
        try {
            if (req.body.email && req.body.password) {
               
                console.log(req.body.email);
                console.log(req.body.password);

                //Select to hide output
                let result = await PatientModule.findOne({email: req.body.email});

                //return res.send(result);

                if (result) {
                    const validpassword = await bcrypt.compare(req.body.password,result.password);

                    // console.log(validpassword); If your password is matched then it returns true.
                    if(validpassword)
                    {

                        if(result.flag === 0){
                            console.log("Your status is deactive right now!!");
                            return res.send(JSON.stringify("Your status is deactive right now!!"));
                        }else{

                            if(result.role === "admin")
                            {
                                // if(result.flag == 0){
                                //     return console.log("Your status is deactive right now!!");
                                // }else{
                                //     return console.log("Your status is Active right now!!");
                                // }
                                Jwt.sign(
                                    { result },
                                    jwtKey,
                                    { expiresIn: '2h' },
                                        (error, token) => {
                                        if (error) {
                                            return res.send('something went wrong');
                                        }
                                        res.send({ result, auth: token,role: result.role });
                                        // localStorage.setItem('token', token);
                                    }
                                );
                            }
                            
                            if(result.role === "patient")
                            {
                                //return console.log("Your status is Active right now!!");
                                Jwt.sign(
                                    { result },
                                    jwtKey,
                                    { expiresIn: '2h' },
                                    (error, token) => {
                                    if (error) {
                                        return res.send('something went wrong');
                                    }
                                    res.send({ result, auth: token,role: result.role });
                                                // localStorage.setItem('token', token);
                                    }
                                );
                            } 
                        }

                        
                    }else{
                        res.send(JSON.stringify("Invalid Email or Password!"));
                    }
                        
                } else {
                    // throw createError(404, 'usernot found');
                    res.send(JSON.stringify("User not found"))
                }

                //console.log({ result, auth: token})
            } else {
                return res.send('Invalid creadential');
            }
        } catch (err) {console.log("server error")}
    },

    countTotalPatient: async (req,resp) => {
        try{
            const result = await PatientModule.find().count();

            if(result){
                resp.send(JSON.stringify(result));
            }else{
                resp.send(JSON.stringify("No records found!!"));
            }
        }catch(err){
            console.log(err);
        }
    },
}