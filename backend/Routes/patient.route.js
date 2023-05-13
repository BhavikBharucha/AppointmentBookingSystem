const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient.controller');

router.post('/PatientRegistration',PatientController.registerPatient);
router.post('/Login',PatientController.login);
router.get('/ListAllPatientDetails',PatientController.ListAllPatientDetails);
router.get('/CountTotalPatient',PatientController.countTotalPatient);

module.exports = router;