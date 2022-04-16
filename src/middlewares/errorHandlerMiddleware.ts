import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (error.type) {
    case "invalid_data":
      return res.status(400).send(error.message);
      break;
    case "unauthorized":
      return res.status(401).send(error.message);
      break;
    case "not_found":
      return res.status(404).send(error.message);
      break;
    case "conflict":
      return res.status(409).send(error.message);
      break;
    case "unprocessable_entity":
      return res.status(422).send(error.message);
      break;
  }
  console.log(error);
  res.sendStatus(500);
}
