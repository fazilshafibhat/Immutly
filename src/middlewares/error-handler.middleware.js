import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      stack: err.stack,
      //   errors: err.errors,
      //   stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  res.status(500).json({
    statusCode: 500,
    success: false,
    message: "Internal Server Error",
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    stack: err.stack,
  });
};

export default errorHandler;