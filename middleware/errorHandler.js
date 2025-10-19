// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack); // log for debugging

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
    // Optionally include stack trace in development only:
    // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}

module.exports = errorHandler;