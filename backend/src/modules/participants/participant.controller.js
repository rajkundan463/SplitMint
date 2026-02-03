const service = require("./participant.service");

exports.addParticipant = async (req, res, next) => {
    try {
        const participant = await service.addParticipant(
            req.params.groupId,
            req.body
        );

        res.status(201).json(participant);
    } catch (err) {
        if (err.message === "Maximum participant limit reached") {
            return res.status(409).json({ error: "Maximum participant limit reached" });
        }
    }
};

exports.updateParticipant = async (req, res, next) => {
    try {
        const participant = await service.updateParticipant(
            req.params.participantId,
            req.body
        );

        res.json(participant);
    } catch (err) {
        next(err);
    }
};

exports.removeParticipant = async (req, res, next) => {
    try {
        await service.removeParticipant(req.params.participantId);
        res.json({ message: "Participant removed successfully" });
    } catch (err) {
        next(err);
    }
};
