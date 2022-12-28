const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../auth/auth");
const { update_data } = require("./update_data/update_data");
const { fetch_data } = require("./fetch_data/fetch_data");

router.post("/customer", verifyToken, update_data);
router.get("/customer", verifyToken, fetch_data);

module.exports = router;
