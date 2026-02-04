const service = require("./balance.service");

exports.getSettlement = async (req, res, next) => {
    try {

        const result =
            await service.getGroupSettlement(
                req.params.groupId
            );

        res.json(result);

    } catch (err) {
        next(err);
    }
};

