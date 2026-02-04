const express = require("express");
const router = express.Router();
const controller = require("./analytics.controller");
const auth = require("../auth/auth.middleware");

router.get("/:groupId/dashboard", auth, controller.getDashboard);

module.exports = router;