const express = require('express');

// const { getList, add, getById remove} = require("../../controllers/contacts-controllers");
const { getList, getById, add, update, updateFavorite, remove } = require("../../controllers/contacts-controllers");
const { authenticat, validateBody } = require("../../utils");
// const checkingOwner = require("../../middlewares/checkingOwner");
const { validatedId, schemas} = require("../../models/contactsM");

const router = express.Router()

router.get('/', authenticat, getList);
router.get('/:contactId', authenticat, validatedId, getById);
router.post('/', authenticat, validateBody(schemas.addSchema), add);
router.put('/:contactId', authenticat, validatedId, validateBody(schemas.putSchema), update);
router.patch('/:contactId/favorite', authenticat, validatedId, validateBody(schemas.patchFavoriteSchema), updateFavorite);
router.delete('/:contactId', authenticat, validatedId, remove);


module.exports = router;