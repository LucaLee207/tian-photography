import express from "express";
import { createArtwork, deleteArtwork, getAllArtworks, getArtworkById, orderArtworks } from "../controllers/artworkController.js";

const router = express.Router();

router.post("/artwork", createArtwork);
router.get("/artwork", getAllArtworks);
router.get("/artwork/:id", getArtworkById);
// router.put("/artwork/:id", updateArtwork);
router.delete("/artwork/:id", deleteArtwork);
router.patch("/artwork/order", orderArtworks);


export default router;


