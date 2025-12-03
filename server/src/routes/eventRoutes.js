import express from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getAllEvents);
router.get("/event/:id", getEventById);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);


export default router;


