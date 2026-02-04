const router = require("express").Router();
const controller = require("./expense.controller");
const auth = require("../auth/auth.middleware");

router.post("/", auth, controller.createExpense);
router.patch("/:expenseId", auth, controller.updateExpense);
router.delete("/:expenseId", auth, controller.deleteExpense);
router.get("/groups/:groupId/expenses",auth,controller.getExpenses);


module.exports = router;
