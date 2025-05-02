export const globalError = (err, req, res, next) => {
    const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
    const status     = err.status || (statusCode >= 500 ? 'error' : 'fail');
  
    res.status(statusCode).json({
      status,
      message: err.message || 'Internal Server Error'
    });
  };
  