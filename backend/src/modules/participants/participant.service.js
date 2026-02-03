const repo = require("./participant.repository");

exports.addParticipant = async (groupId, body) => {

    const count = await repo.countParticipants(groupId);

    if (count >= 4) {
        throw new Error("Maximum participant limit reached");
    }

    return repo.createParticipant({
        name: body.name,
        color: body.color,
        groupId
    });
};


exports.updateParticipant = async (participantId, body) => {

    const participant = await repo.findParticipantById(participantId);

    if (!participant) {
        throw new Error("Participant not found");
    }

    return repo.updateParticipant(participantId, {
        name: body.name,
        color: body.color
    });
};

exports.removeParticipant = async (participantId) => {

    const participant = await repo.findParticipantById(participantId);

    if (!participant) {
        throw new Error("Participant not found");
    }

    if (participant.isPrimary) {
        throw new Error("Primary user cannot be removed");
    }


    const expenseLinked = await repo.findExpenseShare(participantId);

    if (expenseLinked) {
        throw new Error(
            "Participant is linked to expenses. Cannot delete."
        );
    }

    return repo.deleteParticipant(participantId);
};
