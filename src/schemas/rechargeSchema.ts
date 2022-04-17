import Joi from "joi";

const rechargeSchema = Joi.object({
  amount: Joi.number().integer().required(),
});

export default rechargeSchema;
