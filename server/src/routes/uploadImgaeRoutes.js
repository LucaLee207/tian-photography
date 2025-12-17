import express from "express";
import handler from "../controllers/uploagImageController.js"


const router = express.Router();

router.post("/get-upload-img-url", handler);

export default router;