module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || "InternalError";
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    Error: {
      Code: errorCode,
      Message: message,
    },
  });
};
