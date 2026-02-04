const service = require("./expense.service");
const queryService = require("./expense.query");

exports.getExpenses = async (req, res, next) => {
    try {

        const result =
            await queryService.getFilteredExpenses(
                req.params.groupId,
                req.query
            );

        res.json(result);

    } catch (err) {
        next(err);
    }
};


exports.createExpense = async (req, res, next) => {
    try {
        const expense = await service.createExpense(req.body);
        res.status(201).json(expense);
    } catch (err) {
        next(err);
    }
};

exports.updateExpense = async (req, res, next) => {
    try {
        const expense = await service.updateExpense(
            req.params.expenseId,
            req.body
        );

        res.json(expense);
    } catch (err) {
        next(err);
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        await service.deleteExpense(req.params.expenseId);
        res.json({ message: "Expense deleted" });
    } catch (err) {
        next(err);
    }
};

// ............ Query part yaha se shuru hota hai ............

exports.getExpenses = async (req, res, next) => {
    try {

        const result =
            await queryService.getFilteredExpenses(
                req.params.groupId,
                req.query
            );

        res.json(result);

    } catch (err) {
        next(err);
    }
};
