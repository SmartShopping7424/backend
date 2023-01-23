const express = require("express");
const router = express.Router();
const { mobile } = require("./mobile/mobile");
const { otp } = require("./otp/otp");

router.post("/mobile", mobile);
router.post("/otp", otp);

module.exports = router;
