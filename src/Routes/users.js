const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");

router.post("/Register", UsersController.registerUsers);
router.post("/Login", UsersController.login);
router.post("/Verif-Otp", UsersController.verificationOtp);
router.post("/Forgot", UsersController.forgotPassword);
router.post("/Reset-Pass/:token", UsersController.resetPassword);

module.exports = router;
