const express = require("express");

const { authenticat, validateBody } = require("../../utils");
const { upload } = require("../../middlewares");
const { schemas } = require("../../models/users");
const ctr = require("../../controllers/auth-controller");

const router = express.Router();

router.post("/register", validateBody(schemas.regShema), ctr.register);
router.post("/login", validateBody(schemas.logShema), ctr.login);
router.get("/current", authenticat, ctr.getCurrent);
router.post("/logout", authenticat, ctr.logout);
router.patch("/subscription", authenticat, validateBody(schemas.subsriptionShema), ctr.subscription);
router.patch("/avatar", authenticat, upload.single("avatar"), ctr.updateAvatar);


module.exports = router;