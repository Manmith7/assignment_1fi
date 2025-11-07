import Joi from "joi";

export const createEmiValidation = Joi.object({
  tenure: Joi.number().min(1).max(36).required(),
  rate: Joi.number().min(0).required(),
  cashback: Joi.number().optional()
});

export const createProductValidation = Joi.object({
  p_name: Joi.string().required(),
  p_desc: Joi.string().required(),
  p_price: Joi.string().required(),
  p_images: Joi.array().items(
    Joi.object({
      color: Joi.string(),
      images: Joi.array().items(Joi.string())
    })
  ).required(),
  p_varients: Joi.array().items(
    Joi.object({
      storage: Joi.number(),
      ram: Joi.number()
    })
  ).optional(),
  soldBy: Joi.string().required(),
  screenSize: Joi.string().optional()
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed!",
        errors: error.details.map((err) => err.message)
      });
    }

    req.body = value;
    next();
  };
};
