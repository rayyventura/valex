import { NextFunction, Request, Response } from "express";
import * as companyRepository from "../repositories/companyRepository.js";

export async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"].toString();
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) {
    throw { type: "unauthorized", message: "invalid api key" };
  }
  next();
}
