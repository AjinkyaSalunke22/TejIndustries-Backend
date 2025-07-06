const express = require('express');
const { createAppointment } = require('../controllers/appointment.controller');

const router = express.Router();

router.post('/schedule', createAppointment);

module.exports = router;