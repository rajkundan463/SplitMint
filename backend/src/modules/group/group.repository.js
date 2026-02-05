const prisma = require("../../shared/prisma");

exports.createGroupTx = async (tx, data) => {
    return tx.group.create({ data });
};

exports.createParticipantTx = async (tx, data) => {
    return tx.participant.create({ data });
};

exports.countParticipants = (groupId) => {
    return prisma.participant.count({
        where: { groupId }
    });
};

exports.createParticipant = (data) => {
    return prisma.participant.create({ data });
};

exports.deleteParticipant = (participantId) => {
    return prisma.participant.delete({
        where: { id: participantId }
    });
};

exports.findParticipantExpense = (participantId) => {
    return prisma.expenseShare.findFirst({
        where: { participantId }
    });
};

exports.getUserGroups = (userId) => {
    return prisma.group.findMany({
        where: { createdById: userId },
        include: {
            _count: {
                select: {
                    participants: true,
                    expenses: true
                }
            }
        }
    });
};

exports.updateGroup = (groupId, name) => {
    return prisma.group.update({
        where: { id: groupId },
        data: { name }
    });
};

exports.deleteGroup = (groupId) => {
    return prisma.group.delete({
        where: { id: groupId }
    });
};

exports.getExpensesWithShares = (groupId) => {
    return prisma.expense.findMany({
        where: { groupId },
        include: { shares: true }
    });
};

exports.getParticipantsByGroup = (groupId) => {
    return prisma.participant.findMany({
        where: { groupId },

        select: {
            id: true,
            name: true,
            color: true,
            isPrimary: true,
            createdAt: true
        },

        orderBy: { createdAt: "asc" }
    });
};

