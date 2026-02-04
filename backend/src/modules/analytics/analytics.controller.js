const service = require("./analytics.service");

exports.getDashboard = async (req, res,next) => {
    try {

        const data = await service.getGroupDashboard(
            req.params.groupId,
            req.user.participantId,
            req.query
        );

        res.json(data);

    } catch (err) {
        next(err);
    }
};
