import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  fullName: Joi.string().max(100).allow("").required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Telefon raqami noto'g'ri formatda"
    }),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("client", "admin").required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
