const express = require('express');

// const { getList, add, getById remove} = require("../../controllers/contacts-controllers");
const { getList, getById, add, update, updateFavorite, remove } = require("../../controllers/contacts-controllers");
const { authenticat, validateBody } = require("../../utils");
const checkingOwner = require("../../middlewares/checkingOwner");
const { validatedId, schemas} = require("../../models/contactsM");

const router = express.Router()

router.get('/', authenticat, getList);
router.get('/:contactId', authenticat, checkingOwner, validatedId, getById);
router.post('/', authenticat, validateBody(schemas.addSchema), add);
router.put('/:contactId', authenticat, checkingOwner, validatedId, validateBody(schemas.putSchema), update);
router.patch('/:contactId/favorite', authenticat, checkingOwner, validatedId, validateBody(schemas.patchFavoriteSchema), updateFavorite);
router.delete('/:contactId', authenticat, checkingOwner, validatedId, remove);


module.exports = router;