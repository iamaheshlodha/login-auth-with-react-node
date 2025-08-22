import Joi from 'joi';

const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string()
  .pattern(/^[0-9]{10}$/)  
  .required()
  .messages({
    'string.pattern.base': 'Mobile number must be exactly 10 digits.',
    'string.empty': 'Mobile number is required.',
  })
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export {
    registerValidation,
    loginValidation
}