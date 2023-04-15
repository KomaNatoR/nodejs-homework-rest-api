const { Contact } = require("../models/contactsM");
const HttpError = require("../utils/HttpError");

const checkingOwner = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    
    const result = await Contact.findById(contactId);
    if (JSON.stringify(owner) !== JSON.stringify(result.owner)) return next(HttpError(404, "Not found"));
    req.ownersFindByID = result;
    // req.user.ownersFindByID = result;
    // console.log("req.user!!!", req.user);
    // console.log("req.user.ownersFindByID!!!", req.result.ownersFindByID);
    // console.log("contactId!!!", contactId);
    next();
};


module.exports = checkingOwner;