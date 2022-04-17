import { Router } from "express";
import cardsRouter from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const router = Router();
router.use(cardsRouter);
router.use(paymentRouter);
router.use(rechargeRouter);
export default router;
