const express = require('express');

// const { getList, add, getById remove} = require("../../controllers/contacts-controllers");
const { getList, getById, add, update, updateFavorite, remove } = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const {validatedId, schemas} = require("../../models/contactsM");

const router = express.Router()

router.get('/', getList);
router.get('/:contactId',validatedId, getById);
router.post('/', validateBody(schemas.addSchema), add);
router.put('/:contactId',validatedId, validateBody(schemas.putSchema), update);
router.patch('/:contactId/favorite',validatedId, validateBody(schemas.patchFavoriteSchema), updateFavorite);
router.delete('/:contactId',validatedId, remove);


module.exports = router;
