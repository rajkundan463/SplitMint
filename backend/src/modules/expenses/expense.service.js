const prisma = require("../../shared/prisma");
const repo = require("./expense.repository");

const {
    equalSplit,
    customSplit,
    percentSplit
} = require("./split.utils");

exports.createExpense = async (data) => {

    return prisma.$transaction(async (tx) => {

        const expense = await repo.createExpenseTx(tx, {
            amount: data.amount,
            description: data.description,
            date: new Date(data.date),
            payerId: data.payerId,
            groupId: data.groupId,
            splitType: data.splitType
        });

        let shares;

        if (data.splitType === "EQUAL") {
            shares = equalSplit(data.amount, data.participants);
        }

        if (data.splitType === "CUSTOM") {
            shares = customSplit(data.amount, data.splits);
        }

        if (data.splitType === "PERCENT") {
            shares = percentSplit(data.amount, data.splits);
        }

        shares = shares.map(s => ({
            ...s,
            expenseId: expense.id
        }));

        await repo.createSharesTx(tx, shares);

        return expense;
    });
};

exports.updateExpense = async (expenseId, data) => {

    return prisma.$transaction(async (tx) => {

        await repo.deleteSharesTx(tx, expenseId);

        const expense = await repo.updateExpenseTx(
            tx,
            expenseId,
            {
                amount: data.amount,
                description: data.description,
                splitType: data.splitType
            }
        );

        let shares;

        if (data.splitType === "EQUAL")
            shares = equalSplit(data.amount, data.participants);

        if (data.splitType === "CUSTOM")
            shares = customSplit(data.amount, data.splits);

        if (data.splitType === "PERCENT")
            shares = percentSplit(data.amount, data.splits);

        shares = shares.map(s => ({
            ...s,
            expenseId
        }));

        await repo.createSharesTx(tx, shares);

        return expense;
    });
};

exports.deleteExpense = (expenseId) => {
    return repo.deleteExpense(expenseId);
};
