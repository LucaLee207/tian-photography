import express from "express";
import multer from "multer";
import {uploadImg, deleteImg, deleteFolderByPrefix} from "../controllers/imageR2Controller.js";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

// Routes
router.post("/img-R2-upload", upload.single("file"), uploadImg);
router.post("/img-R2-delete", deleteImg);
router.post("/img-R2-delete-folder", deleteFolderByPrefix);

export default router;