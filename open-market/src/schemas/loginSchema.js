import joi from "joi";

const loginSchema = joi.object({
  email: joi.string().required(),
  senha: joi.string().required()
});

export default loginSchema;
