import express from "express"
import 'dotenv/config.js';
import cors from "cors"
import db from "./config/db.js"
import eventRoutes from "./routes/eventRoutes.js" 
import errorHandling from "./middleware/errorHandler.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import imageR2Routes from "./routes/imageR2Routes.js";
import loginRoutes from "./routes/loginRoutes.js"

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", eventRoutes);
app.use("/api", artworkRoutes);
app.use("/api", imageR2Routes);
app.use("/api", loginRoutes);


// Error Handling
app.use(errorHandling);

export default app;