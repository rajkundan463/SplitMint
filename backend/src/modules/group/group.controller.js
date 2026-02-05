const groupService = require("./group.service");

exports.createGroup = async (req, res, next) => {
    try {
        const group = await groupService.createGroup(
            req.user.id,
            req.body
        );

        res.status(201).json(group);
    } catch (err) {
        next(err);
    }
};

exports.getUserGroups = async (req, res, next) => {
    try {
        const groups = await groupService.getUserGroups(req.user.id);
        res.json(groups);
    } catch (err) {
        next(err);
    }
};

exports.updateGroup = async (req, res, next) => {
    try {
        const group = await groupService.updateGroup(
            req.params.groupId,
            req.body.name
        );

        res.json(group);
    } catch (err) {
        next(err);
    }
};

exports.deleteGroup = async (req, res, next) => {
    try {
        await groupService.deleteGroup(req.params.groupId);
        res.json({ message: "Group deleted successfully" });
    } catch (err) {
        next(err);
    }
};

exports.addParticipant = async (req, res, next) => {
    try {
        const participant = await groupService.addParticipant(
            req.params.groupId,
            req.body
        );

        res.status(201).json(participant);
    } catch (err) {
        next(err);
    }
};

exports.removeParticipant = async (req, res, next) => {
    try {
        await groupService.removeParticipant(req.params.participantId);
        res.json({ message: "Participant removed" });
    } catch (err) {
        next(err);
    }
};

exports.getGroupSummary = async (req, res, next) => {
    try {
        const summary = await groupService.getGroupSummary(
            req.params.groupId
        );

        res.json(summary);
    } catch (err) {
        next(err);
    }
};
exports.getParticipants = async (req, res, next) => {

    try {

        const { groupId } = req.params;

        const participants =
            await groupService.getParticipants(groupId);

        res.status(200).json(participants);

    } catch (error) {

        console.error("Get Participants Error:", error);

        res.status(500).json({
            message: "Failed to fetch participants"
        });
    }
};



