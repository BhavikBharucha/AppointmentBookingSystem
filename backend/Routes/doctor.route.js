const express = require('express');
const router = express.Router();

const DoctorController = require('../controllers/doctor.controller');

router.post('/DoctorRegistration',DoctorController.registerDoctor);
router.get('/ListAllDoctorDetails',DoctorController.ListAllDoctorDetails);
router.get('/ListActiveStatusDoctorsDetails',DoctorController.ListAllActiveStatusDoctorsDetails);
router.get('/CountTotalDoctor',DoctorController.CountTotalDoctors);

module.exports = router;