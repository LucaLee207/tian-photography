import express from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent, orderEvents, deleteEventDetail} from "../controllers/eventController.js";

const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getAllEvents);
router.get("/event/:id", getEventById);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);
router.patch("/event/order", orderEvents);
router.delete("/event/detail/:id", deleteEventDetail);

export default router;


