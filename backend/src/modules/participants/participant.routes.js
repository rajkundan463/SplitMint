const express = require("express");
const router = express.Router();

const controller = require("./participant.controller");
const auth = require("../auth/auth.middleware");

router.post("/:groupId", auth, controller.addParticipant);
router.patch("/:participantId", auth, controller.updateParticipant);
router.delete("/:participantId", auth, controller.removeParticipant);

module.exports = router;
