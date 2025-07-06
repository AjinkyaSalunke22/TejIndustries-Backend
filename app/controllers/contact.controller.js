const { sendContactEmail } = require('../services/contact.service');
const { standardResponse } = require('../utils/standardResponse.util');
const logger = require('../utils/logger.util');

const submitContactForm = async (req, res) => {
  logger.info('START - submitContactForm');
  
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      logger.warn('Missing required fields in contact form');
      return standardResponse(res, 400, false, 'Name, email, and mobile are required', null, 'Missing required fields');
    }

    const result = await sendContactEmail({ name, email, mobile });
    
    logger.info('Contact form submitted successfully');
    standardResponse(res, 200, true, result.message, null, null);
  } catch (error) {
    logger.error(`Contact form submission error: ${error.message}`);
    standardResponse(res, 500, false, 'Failed to submit contact form', null, error.message);
  }
  
  logger.info('END - submitContactForm');
};

module.exports = { submitContactForm };