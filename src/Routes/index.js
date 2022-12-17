const express = require("express");
const router = express.Router();
const UsersRouter = require("../routes/users");

router.use("/users", UsersRouter);

module.exports = router;
