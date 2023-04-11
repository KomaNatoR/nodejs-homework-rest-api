const express = require("express");

const { validateBody } = require("../../utils");
const { schemas } = require("../../models/users");
const ctr = require("../../controllers/auth-controller");

const router = express.Router();

router.post("/register", validateBody(schemas.regShema), ctr.register);
router.post("/login", validateBody(schemas.logShema), ctr.login);


module.exports = router;