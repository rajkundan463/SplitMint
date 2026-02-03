const prisma = require("../../shared/prisma");

exports.createExpenseTx = (tx, data) => {
    return tx.expense.create({ data });
};

exports.createSharesTx = (tx, shares) => {
    return tx.expenseShare.createMany({
        data: shares
    });
};

exports.getExpenseById = (id) => {
    return prisma.expense.findUnique({
        where: { id },
        include: { shares: true }
    });
};

exports.deleteSharesTx = (tx, expenseId) => {
    return tx.expenseShare.deleteMany({
        where: { expenseId }
    });
};

exports.updateExpenseTx = (tx, id, data) => {
    return tx.expense.update({
        where: { id },
        data
    });
};

exports.deleteExpense = (id) => {
    return prisma.expense.delete({
        where: { id }
    });
};
