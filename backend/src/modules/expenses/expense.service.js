const prisma = require("../../shared/prisma");
const repo = require("./expense.repository");

const {
    equalSplit,
    customSplit,
    percentSplit
} = require("./split.utils");


const resolveShares = (data) => {

    const { amount, splitType } = data;

    switch (splitType) {

        case "EQUAL":
            return equalSplit(amount, data.participants);

        case "CUSTOM":
            return customSplit(amount, data.splits);

        case "PERCENT":
            return percentSplit(amount, data.splits);

        default:
            throw new Error("Invalid split type.");
    }
};

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

        let shares = resolveShares(data);

        if (!shares?.length) {
            throw new Error("Failed to generate shares.");
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

        let shares = resolveShares(data);

        if (!shares?.length) {
            throw new Error("Failed to generate shares.");
        }

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
