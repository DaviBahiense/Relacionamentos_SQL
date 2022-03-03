import joi from "joi";

const registerSchema = joi.object({
  nome: joi.string().required(),
  email: joi.string().required(),
  senha: joi.string().required()
});

export default registerSchema;