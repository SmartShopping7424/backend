const express = require("express");
const router = express.Router();
const { mobile } = require("./mobile");
const { otp } = require("./otp");

router.post("/login", mobile);
router.post("/otp", otp);

module.exports = router;
