const express = require('express');
const router = express.Router();

const AppointmentController = require("../controllers/appointment.controller");

router.post('/BookAppointment',AppointmentController.bookAppointment);
router.get('/ListAllAppointments',AppointmentController.ListAllAppointments);
router.get('/ListAppointmentsByPatientId/:patientid',AppointmentController.ListAllAppointmentsByPatientId);
router.patch('/ChangeAppointmentStatusToConfirm/:id',AppointmentController.ChangeStatusToConfirm);
router.patch('/ChangeAppointmentStatusToRejected/:id',AppointmentController.ChangeStatusToReject);
router.get('/CountTotalPatientAppointments',AppointmentController.countTotalPatientAppointments);
router.get('/CountTotalConfirmAppointments',AppointmentController.countTotalConfirmAppointments);
router.get('/CountTotalPendingAppointments',AppointmentController.countTotalPendingAppointments);
router.get('/CountTotalRejectedAppointments',AppointmentController.countTotalRejectedAppointments);

module.exports = router;