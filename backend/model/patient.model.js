const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        firstname:{
            type: String
        },

        lastname:{
            type: String
        },

        date_of_birth:{
            type: Date
        },

        gender:{
            type: Number
        },

        contact_number:{
            type: Number
        },

        email:{
            type: String
        },
        
        address:{
            type: String
        },

        patient_registered_date:{
            type: Date,
            default: Date.now()
        },
        password:{
            type: String
        },
        flag:{
            type: Number,
            default: 1
        },
        role:{
            type: String,
            default: "patient"
        }
    },
    {timestamps: true}
);

const PatientModule = mongoose.model('tbl_patient',schema);
module.exports = PatientModule;