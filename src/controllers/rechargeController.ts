import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";

export async function recharge(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  await rechargeService.recharge(Number(id), amount);
  res.sendStatus(201);
}
