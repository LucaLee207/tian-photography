import express from "express";
import {loginAdmin, verifyToken} from "../controllers/loginController.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.get("/verify-token", verifyToken);

export default router;