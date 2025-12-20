import {Pool} from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5433,
    database: process.env.DB_NAME
});

export const initializeDatabase = async () => {
    const schemaQuery = `
        CREATE TABLE IF NOT EXISTS artwork (
            id SERIAL PRIMARY KEY,
            position INTEGER NOT NULL,
            url VARCHAR(256) NOT NULL,
            category VARCHAR(100) NOT NULL,
            filename VARCHAR(256) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS event (
            id SERIAL PRIMARY KEY,
            position INTEGER NOT NULL,
            title VARCHAR(256) NOT NULL,
            content TEXT NOT NULL,
            url VARCHAR(256) NOT NULL,
            category VARCHAR(100) NOT NULL,
            filename VARCHAR(256) NOT NULL
        );
    `;
    try {
        await pool.query(schemaQuery);
        console.log("✅ Database schema verified/created successfully.");
    } catch (err) {
        console.error("❌ Error initializing database schema:", err);
        // Optional: stop the server if the DB can't be initialized
        process.exit(1); 
    }
};

export default  {
    query: (text, params) => pool.query(text, params)
};


