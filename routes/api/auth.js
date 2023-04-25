const express = require("express");

const { authenticat, validateBody } = require("../../utils");
const { upload } = require("../../middlewares");
const { schemas } = require("../../models/users");
const ctr = require("../../controllers/auth-controller");

const router = express.Router();

router.post("/register", validateBody(schemas.regShema), ctr.register);
router.get("/verify/:verificationToken", ctr.verifyEmail);
router.get("/verify", validateBody(schemas.emailShema), ctr.resendVerifyEmail);
router.post("/login", validateBody(schemas.logShema), ctr.login);
router.get("/current", authenticat, ctr.getCurrent);
router.post("/logout", authenticat, ctr.logout);
router.patch("/subscription", authenticat, validateBody(schemas.subsriptionShema), ctr.subscription);
router.patch("/avatars", authenticat, upload.single("avatars"), ctr.updateAvatar);


module.exports = router;