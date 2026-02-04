const express = require("express");
const router = express.Router();

const controller = require("./balance.controller");
const auth = require("../auth/auth.middleware");

router.get("/:groupId/settlement", auth, controller.getSettlement);

module.exports = router;
