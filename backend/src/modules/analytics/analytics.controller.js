const prisma = require("../../shared/prisma");
const service = require("./analytics.service");

exports.getDashboard = async (req, res, next) => {

    try {

        const { groupId } = req.params;
        const userId = req.user.id;


        let participant = await prisma.participant.findFirst({
            where: {
                groupId,
                userId
            }
        });


        if (!participant) {

            participant = await prisma.participant.create({
                data: {
                    name: req.user.name || "You",
                    groupId,
                    userId,
                    isPrimary: true,
                    color: "#6366F1"
                }
            });
        }

        const data = await service.getGroupDashboard(
            groupId,
            participant.id,
            req.query
        );

        res.json(data);

    } catch (err) {
        next(err);
    }
};
