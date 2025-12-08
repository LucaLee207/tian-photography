import express from "express"
import 'dotenv/config.js';
import cors from "cors"
import db from "./src/config/db.js"
import eventRoutes from "./src/routes/eventRoutes.js" 
import errorHandling from "./src/middleware/errorHandler.js";
import artworkRoutes from "./src/routes/artworkRoutes.js";
const app = express();
const PORT = 5000;

// Error Handling
app.use(errorHandling);
// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", eventRoutes);
app.use("/api", artworkRoutes);
app.get("/test", async(req, res) => {
    try{
        const result = await db.query("SELECT * FROM event");
        res.json(result.rows);
        
    }catch (err){
        console.error(err);
        res.status(500), send("internal Server Error");
    }
})

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`)
})