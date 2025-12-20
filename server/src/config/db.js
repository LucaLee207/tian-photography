import {Pool} from 'pg';
// =============dev===============

var pool;
if (process.env.NODE_ENV !== 'production') {
    pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5433,
    database: process.env.DB_NAME
});
}else{
    pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Recommended for Neon/Serverless: 
    // Helps clean up old connections that might stay "hanging" after a sleep
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 5000, 
});
}


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


