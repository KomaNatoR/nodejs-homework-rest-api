const { Contact } = require("../models/contactsM");
const HttpError = require("../utils/HttpError");

const checkingOwner = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    
    const result = await Contact.findById(contactId);
    if (JSON.stringify(owner) !== JSON.stringify(result.owner)) return next(HttpError(404, "Not found"));
    req.ownersFindByID = result;
    next();
};


module.exports = checkingOwner;