const { Contact } = require("../models/contactsM");
const HttpError = require("../utils/HttpError");

const checkingOwner =async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    
    const result = await Contact.findById(contactId);
    if (JSON.stringify(owner) !== JSON.stringify(result.owner)) throw HttpError(404, "Not found");
}


module.exports = checkingOwner;