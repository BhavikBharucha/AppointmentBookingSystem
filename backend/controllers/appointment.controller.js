const AppointmentModule = require('../model/appointment.model');

module.exports = {
    bookAppointment: async (req,res,next) => {
        try{
            const appointment = new AppointmentModule(req.body);

            if(!req.body.patientid || !req.body.doctorid || !req.body.appointment_date || !req.body.appointment_time){
                return res.send("Please Fill all the fields");
            }

            //checkexists_email = await AppointmentModule.findOne({email: req.body.email});

            
                const result = await appointment.save(); //save to insert
    
                if (result) {
                    console.log(result);
                    res.send(JSON.stringify('Appointment Registered Successsfully'));
                }
            
        }catch(err){
            console.log(err);
        }
    },

    ListAllAppointments: async (req,res,next) => {
        try{
            const result = await AppointmentModule.find().populate('patientid','firstname').populate('doctorid','firstname specialization').sort({appointment_date: -1});

            //if(result > 0){
                res.send({data: result});
                console.log(result);
            // }else{
            //     res.send(JSON.stringify("No record found!!"));
            // }
        }catch(err){
            console.log(err);
        }
    },

    ListAllPendingAppointments: async (req,res,next) => {
        try{
            const result = await AppointmentModule.find({status:0}).populate('patientid','firstname').populate('doctorid','firstname specialization').sort({appointment_date: -1});

            //if(result > 0){
                res.send({data: result});
                console.log(result);
            // }else{
            //     res.send(JSON.stringify("No record found!!"));
            // }
        }catch(err){
            console.log(err);
        }
    },

    ListAllConfirmAppointments: async (req,res,next) => {
        try{
            const result = await AppointmentModule.find({status:1}).populate('patientid','firstname').populate('doctorid','firstname specialization').sort({appointment_date: -1});

            //if(result > 0){
                res.send({data: result});
                console.log(result);
            // }else{
            //     res.send(JSON.stringify("No record found!!"));
            // }
        }catch(err){
            console.log(err);
        }
    },

    ListAllRejectedAppointments: async (req,res,next) => {
        try{
            const result = await AppointmentModule.find({status:2}).populate('patientid','firstname').populate('doctorid','firstname specialization').sort({appointment_date: -1});

            //if(result > 0){
                res.send({data: result});
                console.log(result);
            // }else{
            //     res.send(JSON.stringify("No record found!!"));
            // }
        }catch(err){
            console.log(err);
        }
    },

    ListAllAppointmentsByPatientId: async (req,res,next) => {
        try{

             //return console.log("select called");
            //const id = req.body.membership_id;
            const patientid = req.params.patientid;

            const result = await AppointmentModule.find({patientid: patientid}).populate('patientid','firstname').populate('doctorid','firstname specialization');
            //return console.log(JSON.stringify(result));

            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
        }catch(err){
            console.log(err);
        }
    },

    ChangeStatusToConfirm: async (req,res,next)=>{
        try{
            const id = req.params.id;

            const check_status = await AppointmentModule.findById(id);

            //return console.log(check_status.status);

            if(check_status.status == 0  ){
                console.log("Appoinement Pending");
                updates = {status:1}
                console.log("Appointment Confirm");
            }

            const options = {
                new: true
            };
            const result = await AppointmentModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'SoftDelete failed' });
            }
            res.send({data: result});
        }catch(err){
            console.log(err);
        }
    },

    ChangeStatusToReject: async (req,res,next)=>{
        try{
            const id = req.params.id;

            const check_status = await AppointmentModule.findById(id);

            console.log(check_status.status);

            if(check_status.status == 0){
                console.log("Appoinement Pending");
                updates = {status:2}
                console.log("Appoinement Rejected");
            }

            const options = {
                new: true
            };
            const result = await AppointmentModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'SoftDelete failed' });
            }
            res.send({data: result});
        }catch(err){
            console.log(err);
        }
    },

    countTotalPendingAppointments: async (req,resp) => {
        try{
            const result = await AppointmentModule.find({status:0}).count();

            if(result){
                resp.send(JSON.stringify(result));
            }else{
                resp.send(JSON.stringify("No records found!!"));
            }
        }catch(err){
            console.log(err);
        }
    },

    countTotalConfirmAppointments: async (req,resp) => {
        try{
            const result = await AppointmentModule.find({status:1}).count();

            if(result){
                resp.send(JSON.stringify(result));
            }else{
                resp.send(JSON.stringify("No records found!!"));
            }
        }catch(err){
            console.log(err);
        }
    },

    countTotalRejectedAppointments: async (req,resp) => {
        try{
            const result = await AppointmentModule.find({status:2}).count();

            if(result){
                resp.send(JSON.stringify(result));
            }else{
                resp.send(JSON.stringify("No records found!!"));
            }
        }catch(err){
            console.log(err);
        }
    },

    countTotalPatientAppointments: async (req,resp) => {
        try{
            const result = await AppointmentModule.find().count();

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