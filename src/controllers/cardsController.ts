import { Request, Response } from "express";
import * as cardsServices from "../services/cardsServices.js";

export async function create(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;
  await cardsServices.create(employeeId, type, apiKey);
  res.sendStatus(201);
}

export async function activate(req: Request, res: Response) {
  const data = req.body;
  await cardsServices.activate(data);
  res.sendStatus(200);
}
