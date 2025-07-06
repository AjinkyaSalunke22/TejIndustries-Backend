const express = require('express');
const contactRoutes = require('./contact.routes');
const appointmentRoutes = require('./appointment.routes');

const router = express.Router();

router.use('/contact', contactRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;