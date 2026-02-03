const { z } = require("zod");

exports.addParticipantSchema = z.object({
    name: z.string().min(2),
    color: z.string().optional()
});

exports.updateParticipantSchema = z.object({
    name: z.string().min(2).optional(),
    color: z.string().optional()
});
