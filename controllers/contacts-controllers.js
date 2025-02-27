const {Contact} = require("../models/contactsM");
// const { HttpError } = require("../utils");
const { HttpError, ctrlWrapper } = require("../utils");


// ------------------------------------------------------------------------ | ROUTERS
const getList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", { skip, limit }).populate("owner", "email"); // populate() бере ід записане в цьому полі, іде в колекцію яка вказана в contactSchema.owner.ref і записує цей обєкт(це назив поширений запит!)!
  // Другий параметр перелік полів який нам потрібен! Ця штука ставиться коли на потрібно розширити поле овнер!
  const favoriteResult = result.filter(it => it.favorite);
  const chekingResult = Object.keys(req.query).find(it => it === "favorite");
  
  res.json(chekingResult ? favoriteResult : result);
};

const getById = async (req, res) => {
  // const { _id: owner } = req.user;
  const { ownersFindByID } = req;
  // const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId }); - один із варіантів!

  // const result = await Contact.findById(contactId);
  // if (JSON.stringify(owner) !== JSON.stringify(result.owner)) throw HttpError(404, "Not found");
  if (!ownersFindByID) {
    throw HttpError(404, "Not found");
  }
  res.json(ownersFindByID);
};

const add = async (req, res) => {
  const { _id: owner } = req.user; // забираємо з реквеста(інфу про якого ми записали в authenticat) і перейм. в owner! 
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const update = async (req, res) => {
  // const { _id: owner } = req.user;
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  // const allResult = await Contact.findById(contactId);
  // if (JSON.stringify(owner) !== JSON.stringify(allResult.owner)) throw HttpError(404, "Not found");
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  // const { _id: owner } = req.user;
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  // const allResult = await Contact.findById(contactId);
  // if (JSON.stringify(owner) !== JSON.stringify(allResult.owner)) throw HttpError(404, "Not found");
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  // const { _id: owner } = req.user;
  const { contactId } = req.params;

  
  // const allResult = await Contact.findById(contactId);
  // if (JSON.stringify(owner) !== JSON.stringify(allResult.owner)) throw HttpError(404, "Not found");
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