import Joi from "joi";

export const proyectoSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": "El nombre debe ser un texto.",
      "string.empty": "El nombre no puede estar vacío.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre no puede tener más de 255 caracteres.",
      "any.required": "El nombre es obligatorio."
    }),
  ubicacion: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.base": "La ubicación debe ser un texto.",
      "string.empty": "La ubicación no puede estar vacía.",
      "string.min": "La ubicación debe tener al menos 5 caracteres.",
      "string.max": "La ubicación no puede tener más de 255 caracteres.",
      "any.required": "La ubicación es obligatoria."
    }),
  descripcion: Joi.string()
    .min(5)
    .optional()
    .messages({
      "string.base": "La descripción debe ser un texto.",
      "string.min": "La descripción debe tener al menos 5 caracteres."
    }),
   fecha_inicio: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "La fecha de inicio debe ser una fecha válida.",
      "any.required": "La fecha de inicio es obligatoria."
    })
});

export const idSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID debe ser un número.",
      "number.integer": "El ID debe ser un número entero.",
      "number.positive": "El ID debe ser un número positivo.",
      "any.required": "El ID es obligatorio."
    })
});
