import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import * as paymentController from "../controllers/paymentController.js";
import paymentSchema from "../schemas/paymentSchema.js";
import { validateApiKey } from "../middlewares/validateApiKey.js";

const paymentRouter = Router();

paymentRouter.post(
  "/cards/payment",
  validateSchema(paymentSchema),
  paymentController.pay
);

export default paymentRouter;
