import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";

import config from "../config";
import zodErrorHandaler from "../errors/zodErrorHandlaler";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandeling: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "Something went worng!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went worng!",
    },
  ];

  // checking zod, mongose, cast error
  if (err instanceof ZodError) {
    const simplefiedError = zodErrorHandaler(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err.name === "ValidationError") {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err.name === "CastError") {
    const simplefiedError = handleCastError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err.code === 11000) {
    const simplefiedError = handleDuplicateError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandeling;
