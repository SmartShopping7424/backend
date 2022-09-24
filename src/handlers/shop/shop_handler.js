const express = require("express");
const router = express.Router();
const { create_id } = require("./employees/create_id/create_id");
const { login } = require("./employees/login/login");

router.post("/shop/employee/create_id", create_id);
router.post("/shop/employee/login", login);

module.exports = router;
