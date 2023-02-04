const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");
const { validate } = require("../Helpers/users");
const { UsersController } = require("../controllers/users");

router.post("/register", validate, UsersController.registerUsers);
router.post("/login", UsersController.login);
router.post("/verif", UsersController.verificationOtp);
router.post("/forgot", UsersController.forgotPassword);
router.post("/forgot/:token", UsersController.resetPassword);
router.get("/all", UsersController.getUser);
router.get("/detail", protect, UsersController.getDetail);
router.put("/update", protect, upload.single("photo"), UsersController.update);

module.exports = router;
