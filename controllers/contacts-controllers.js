const {Contact} = require("../models/contactsM");
// const { HttpError } = require("../utils");
const { HttpError, ctrlWrapper } = require("../utils");


// ------------------------------------------------------------------------ | ROUTERS
const getList = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId }); - один із варіантів!

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
  remove: ctrlWrapper(remove),
};