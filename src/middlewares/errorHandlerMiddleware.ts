import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (error.type) {
    case "unauthorized":
      return res.sendStatus(401);
      break;
    case "not_found":
      return res.sendStatus(404);
      break;
    case "conflict":
      return res.sendStatus(409);
      break;
    case "unprocessable_entity":
      return res.sendStatus(422);
      break;
  }
  console.log(error);
  res.sendStatus(500);
}
