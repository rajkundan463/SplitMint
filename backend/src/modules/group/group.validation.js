const { z } = require("zod");

exports.createGroupSchema = z.object({
    name: z.string().min(3)
});

exports.participantSchema = z.object({
    name: z.string().min(2),
    color: z.string().optional()
});
