const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        patientid:{
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tbl_patient' }],
            required: [true, 'patientid required']
        },

        doctorid:{
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tbl_doctor' }],
            required: [true, 'doctorid required']
        },

        appointment_date:{
            type: Date,
            default: (new Date()).getDate()
        },

        appointment_time:{
            type: String
        },

        status:{
            type: Number,
            default: 0
        }
    }
);

const AppointmentModule = mongoose.model('tbl_appointment',schema);
module.exports = AppointmentModule;