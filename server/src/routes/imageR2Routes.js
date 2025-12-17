import express from "express";
import {uploadImg, deleteImg} from "../controllers/imageR2Controller.js";


const router = express.Router();

router.post("/img-R2-upload", uploadImg);
router.post("/img-R2-delete", deleteImg);

export default router;