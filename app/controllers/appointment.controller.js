const { scheduleAppointment } = require('../services/appointment.service');
const { standardResponse } = require('../utils/standardResponse.util');
const logger = require('../utils/logger.util');

const createAppointment = async (req, res) => {
  logger.info('START - createAppointment');
  
  try {
    const { name, email, mobile, date, time } = req.body;

    if (!name || !email || !mobile || !date || !time) {
      logger.warn('Missing required fields in appointment request');
      return standardResponse(res, 400, false, 'Name, email, mobile, date, and time are required', null, 'Missing required fields');
    }

    const result = await scheduleAppointment({ name, email, mobile, date, time });
    
    logger.info('Appointment created successfully');
    standardResponse(res, 200, true, result.message, null, null);
  } catch (error) {
    logger.error(`Appointment creation error: ${error.message}`);
    standardResponse(res, 500, false, 'Failed to schedule appointment', null, error.message);
  }
  
  logger.info('END - createAppointment');
};

module.exports = { createAppointment };