const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

require('./DB/connection')();

const DoctorRoute = require('./Routes/doctor.route');
const PatientRoute = require('./Routes/patient.route');
const AppointmentRoute = require('./Routes/appointment.route');

app.use('/doctor',DoctorRoute);
app.use('/patient',PatientRoute);
app.use('/appointment',AppointmentRoute);

console.log("Running at PORT: " + PORT);

app.listen(PORT);