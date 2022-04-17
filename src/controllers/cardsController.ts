import { Request, Response } from "express";
import * as cardsServices from "../services/cardsService.js";
import * as rechargeService from "../services/rechargeService.js";

export async function create(req: Request, res: Response) {
  const { employeeId, type } = req.body;
  await cardsServices.create(employeeId, type);
  res.sendStatus(201);
}

export async function activate(req: Request, res: Response) {
  const data = req.body;
  await cardsServices.activate(data);
  res.sendStatus(200);
}
export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const answer = await cardsServices.getTransaction(Number(id));
  res.status(200).send(answer);
}
