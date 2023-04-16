const { Schema, model } = require("mongoose");
// const mongoose = require('mongoose');
const Joi = require("joi");

const handleMongooseError = require("../utils/handleMongooseError");

const userShema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
}, { versionKey: false });
userShema.post("save", handleMongooseError);

const regShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const logShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const subsriptionShema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required().messages({
    "any.only": `Must be 'starter', 'pro' or 'business'!`,
    "any.required": `SUBSCRIPTION is required!`,
  }),
});
const schemas = {
  regShema,
  logShema,
  subsriptionShema,
}

const User = model("user", userShema);
module.exports = {
  User,
//   validatedId,
  schemas,
};