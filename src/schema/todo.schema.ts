import Joi from "joi";
export const createTodoBodySchema = Joi.object({

  title: Joi.string().max(50).required().messages({
    "any.required": "Title is required",
    "string.max": "Title must be less than 50 characters",
    "string.empty": "Title cannot be empty",

  }),

}).options({ stripUnknown: true });

export const updateTodoBodySchema = Joi.object({

  title: Joi.string().max(50).empty().messages({
    "string.max": "Title must be less than 50 characters",
    "string.empty": "Title cannot be empty",
  }),
  completed : Joi.string().empty().messages({
    "string.empty" : "Status cannot be empty"
  })

}).options({ stripUnknown: true });









