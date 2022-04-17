import Joi from "joi";
const paymentSchema = Joi.object({
  cardId: Joi.number().integer().required(),
  password: Joi.string().max(4).min(4).required(),
  businessId: Joi.number().integer().required(),
  amount: Joi.number().min(1).integer().required(),
});

export default paymentSchema;
