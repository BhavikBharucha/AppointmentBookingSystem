const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            maxLength: 35,
            required: [true, 'firstname required']
        },
        lastname: {
            type: String,
            maxLength: 35,
            required: [true, 'lastname required']
        },
        specialization:{
            type: String,
            required: [true, 'specialization required']
        },

        contact_number:{
            type: Number,
            required: [true, 'contact_number required']
        },

        email:{
            type: String,
            required: [true, 'email required']
        },

        department:{
            type: String,
            required: [true, 'department required']
        },

        doctor_registered_date:{
            type: Date,
            default: Date.now()
        },

        flag:{
            type: Number,
            default: 1
        }
    },
    { timestamps: true }
);

const DoctorModule = mongoose.model('tbl_doctor',schema);
module.exports = DoctorModule;