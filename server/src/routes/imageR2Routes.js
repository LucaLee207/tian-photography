import express from "express";
import {uploadImg, deleteImg, deleteFolderByPrefix} from "../controllers/imageR2Controller.js";


const router = express.Router();

router.post("/img-R2-upload", uploadImg);
router.post("/img-R2-delete", deleteImg);
router.post("/img-R2-delete-folder", deleteFolderByPrefix);

export default router;