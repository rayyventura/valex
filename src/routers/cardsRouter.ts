import { Router } from "express";
import * as cardsController from "../controllers/cardsController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { cardSchema, activateCardSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();
cardsRouter.post("/cards", validateSchema(cardSchema), cardsController.create);
cardsRouter.put(
  "/cards",
  validateSchema(activateCardSchema),
  cardsController.activate
);

export default cardsRouter;
