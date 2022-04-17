import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function pay(req: Request, res: Response) {
  const data = req.body;

  await paymentService.pay(data);

  res.sendStatus(201);
}
