import { Router } from "express";
import * as cardsController from "../controllers/cardsController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { cardSchema, activateCardSchema } from "../schemas/cardSchema.js";
import { validateApiKey } from "../middlewares/validateApiKey.js";

const cardsRouter = Router();
cardsRouter.post(
  "/cards",
  validateSchema(cardSchema),
  validateApiKey,
  cardsController.create
);
cardsRouter.put(
  "/cards",
  validateSchema(activateCardSchema),
  cardsController.activate
);
cardsRouter.get("/cards/:id", cardsController.getById);

export default cardsRouter;
