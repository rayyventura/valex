import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import * as rechargeController from "../controllers/rechargeController.js";
import rechargeCardSchema from "../schemas/rechargeSchema.js";
import { validateApiKey } from "../middlewares/validateApiKey.js";

const rechargeRouter = Router();

rechargeRouter.post(
  "/cards/:id/recharge",
  validateSchema(rechargeCardSchema),
  validateApiKey,
  rechargeController.recharge
);

export default rechargeRouter;
