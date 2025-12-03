import pool from "../config/db.js"


export const getAllEventsService = async () => {
    const result = await pool.query("SELECT * FROM test1");
    return result.rows;
};

export const getEventByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM test1 where id = $1", [id]);
    return result.rows[0];
};

export const createEventService = async (position, title, content, url) => {
    const result = await pool.query("INSERT INTO test1 (position, title, content, url) VALUES ($1, $2, $3, $4) RETURNING *", 
        [position, title, content, url]);
    return result.rows[0];
};

export const updateEventService = async (id, position, title, content, url) => {
    const result = await pool.query("UPDATE test1 SET position=$1, title=$2, content=$3, url=$4 WHERE id=$5 RETURNING *", 
        [position, title, content, url, id]);
    return result.rows[0];
};

export const deleteEventService = async (id) => {
    const result = await pool.query("DELETE FROM test1 WHERE id = $1", [id]);
    return result.rows[0];
};

export const orderEventsService = async (ids) => {
    console.log("Reordering events with IDs:", ids);
    // This ensures if any update fails, ALL previous updates are rolled back.
    for (let i = 0; i < ids.length; i++) {
        const sql = `
            UPDATE test1
            SET position = $1
            WHERE id = $2;
        `;
        // $1 is the new position, $2 is the identifier (old position)
        await pool.query(sql, [i+1, ids[i]]);
    }
    return true;
};