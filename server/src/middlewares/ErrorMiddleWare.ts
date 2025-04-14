import { NextFunction, Request, Response } from "express";

export const ErrorMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Server Error";
  return res.status(400).json({
    success: false,
    message: err.message,
  });
};
