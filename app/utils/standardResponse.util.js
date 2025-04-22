exports.standardResponse = (res, statusCode, success, message, data, error) => {
    const responseBody = {
      success,
      message,
      data: data || undefined,
      error: error || undefined,
    };
  
    return res.status(statusCode).json(responseBody);
  };
    