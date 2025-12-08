import {Pool} from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5433,
    database: process.env.DB_NAME
});

export default  {
    query: (text, params) => pool.query(text, params)
};


