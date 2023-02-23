const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/login")
    .post(users.login)

router.route("/registration")
    .post(users.registration)

module.exports = router;
