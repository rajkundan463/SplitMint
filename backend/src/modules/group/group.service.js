const prisma = require("../../shared/prisma");
const repo = require("./group.repository");

exports.createGroup = async (userId, body) => {

    return prisma.$transaction(async (tx) => {

        const group = await repo.createGroupTx(tx, {
            name: body.name,
            createdById: userId
        });


        await repo.createParticipantTx(tx, {
            name: body.primaryName || "You",
            isPrimary: true,
            groupId: group.id,
            userId: userId, // ⭐ CRITICAL FIX
            color: body.color || "#6366F1"
        });

        return group;
    });
};

exports.getUserGroups = (userId) => {
    return repo.getUserGroups(userId);
};
exports.updateGroup = (groupId, name) => {
    return repo.updateGroup(groupId, name);
};
exports.deleteGroup = (groupId) => {
    return repo.deleteGroup(groupId);
};
exports.addParticipant = async (groupId, body) => {

    const count = await repo.countParticipants(groupId);

    if (count >= 4) {
        throw new Error("Max 4 participants allowed");
    }

    return repo.createParticipant({
        name: body.name,
        color: body.color,
        groupId
    });
};
exports.removeParticipant = async (participantId) => {

    const exists = await repo.findParticipantExpense(participantId);

    if (exists) {
        throw new Error(
            "Participant is involved in expenses"
        );
    }

    return repo.deleteParticipant(participantId);
};
exports.getGroupSummary = async (groupId) => {

    const expenses = await repo.getExpensesWithShares(groupId);

    let total = 0;
    const paid = {};
    const owed = {};

    expenses.forEach(exp => {

        total += Number(exp.amount);

        paid[exp.payerId] =
            (paid[exp.payerId] || 0) + Number(exp.amount);

        exp.shares.forEach(share => {
            owed[share.participantId] =
                (owed[share.participantId] || 0) +
                Number(share.shareAmount);
        });
    });

    const balances = {};

    const ids = new Set([
        ...Object.keys(paid),
        ...Object.keys(owed)
    ]);

    ids.forEach(id => {
        balances[id] =
            (paid[id] || 0) - (owed[id] || 0);
    });

    return {
        totalSpent: total,
        balances
    };
};
exports.getParticipantsByGroup = (groupId) => {
    return prisma.participant.findMany({
        where: { groupId },
        orderBy: { createdAt: "asc" }
    });
};
exports.getParticipants = (groupId) => {
    return repo.getParticipantsByGroup(groupId);
};
