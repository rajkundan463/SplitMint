const express = require("express");
const router = express.Router();

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/groups", require("../modules/group/group.routes"));
router.use("/participants", require("../modules/participants/participant.routes"));
router.use("/expenses", require("../modules/expenses/expense.routes"));

module.exports = router;
