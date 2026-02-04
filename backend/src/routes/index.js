const express = require("express");
const router = express.Router();

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/groups", require("../modules/group/group.routes"));
router.use("/participants", require("../modules/participants/participant.routes"));
router.use("/expenses", require("../modules/expenses/expense.routes"));
router.use("/balance", require("../modules/balance/balance.routes"));
router.use("/analytics", require("../modules/analytics/analytics.routes"));


module.exports = router;