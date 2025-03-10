const express = require("express");
const { createEvent, getEvents,updateEvent,deleteEvent } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/:userId", authMiddleware, getEvents);
router.put("/:id", authMiddleware, updateEvent); // Update task
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
