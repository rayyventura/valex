import Joi from "joi";
const cardSchema = Joi.object({
  employeeId: Joi.number().integer().required(),
  type: Joi.string().required(),
});

const activateCardSchema = Joi.object({
  cardId: Joi.number().integer().required(),
  cvc: Joi.string().max(3).required(),
  password: Joi.string().min(4).max(4).required(),
});

export { cardSchema, activateCardSchema };
