const prisma = require("../../shared/prisma");

exports.countParticipants = (groupId) => {
    return prisma.participant.count({
        where: { groupId }
    });
};

exports.createParticipant = (data) => {
    return prisma.participant.create({ data });
};

exports.findParticipantById = (id) => {
    return prisma.participant.findUnique({
        where: { id }
    });
};

exports.updateParticipant = (id, data) => {
    return prisma.participant.update({
        where: { id },
        data
    });
};

exports.deleteParticipant = (id) => {
    return prisma.participant.delete({
        where: { id }
    });
};

exports.findExpenseShare = (participantId) => {
    return prisma.expenseShare.findFirst({
        where: { participantId }
    });
};
