const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const Joi = require("joi");

const { HttpError, handleMongooseError } = require("../utils");

// - перевірка по схемі монгуса!
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { versionKey: false}); // , timestamps: true  - це якщо треба шоб дату створення і оновлення писало!
// - contactSchema.post() це мідлвар - Спрацьовує лише коли валідація по схемі не вдалася!(це для того шоб ловити помилку бо сам монгус не кидає!)
contactSchema.post("save", handleMongooseError); 

const validatedId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.isValidObjectId(contactId)) {
    throw HttpError(404, "Not found");
  };
  next();
};                                 

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `'name' is required!`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `'email' is required!`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `'phone' is required!`,
  }),
  favorite: Joi.boolean(),
});
const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const patchFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  addSchema,
  putSchema,
  patchFavoriteSchema,
}

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  validatedId,
  schemas,
};