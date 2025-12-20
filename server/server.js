import app from './app.js';
import { initializeDatabase } from './src/config/db.js';
const PORT = 5000;

const startServer = async () => {
    // 1. Initialize the DB tables first
    await initializeDatabase();

    // 2. Start the Express server
    app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`)
    });
};

startServer();
