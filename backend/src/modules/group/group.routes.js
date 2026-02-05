const express = require("express");
const router = express.Router();

const controller = require("./group.controller");
const authMiddleware = require("../auth/auth.middleware");


router.post("/", authMiddleware, controller.createGroup);
router.get("/", authMiddleware, controller.getUserGroups);
router.patch("/:groupId", authMiddleware, controller.updateGroup);
router.delete("/:groupId", authMiddleware, controller.deleteGroup);
router.post("/:groupId/participants", authMiddleware, controller.addParticipant);
router.delete("/participants/:participantId", authMiddleware, controller.removeParticipant);
router.get("/:groupId/summary", authMiddleware, controller.getGroupSummary);
router.get("/:groupId/participants", authMiddleware, controller.getParticipants);


module.exports = router;
