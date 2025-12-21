import app from '../src/app.js';
import { initializeDatabase } from '../src/config/db.js';
const PORT = 5000;

export default app;

if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
    // 1. Initialize the DB tables first
    await initializeDatabase();

    // 2. Start the Express server 
    app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`)
    });
    
    };
    startServer();
}

