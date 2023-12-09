const express = require("express");
const loginUser = require("../controller/userLoginController");
const router = express.Router();

router.route("/login").post(loginUser);

module.exports = router;
 