import express from "express"
import 'dotenv/config.js';
import cors from "cors"
import db from "./src/config/db.js"
import eventRoutes from "./src/routes/eventRoutes.js" 
import errorHandling from "./src/middleware/errorHandler.js";
import artworkRoutes from "./src/routes/artworkRoutes.js";
import imageR2Routes from "./src/routes/imageR2Routes.js";
import loginRoutes from "./src/routes/loginRoutes.js"

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