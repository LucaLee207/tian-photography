import pool from "../config/db.js"


export const getAllEventsService = async () => {
    const result = await pool.query("SELECT * FROM event ORDER BY position ASC");
    return result.rows;
};

export const getEventByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM event where id = $1", [id]);
    return result.rows[0];
};

export const createEventService = async (position, title, content, url, category) => {
    const result = await pool.query("INSERT INTO event (position, title, content, url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [position, title, content, url, category]);
    return result.rows[0];
};

export const updateEventService = async (id, title, content, url) => {
    const result = await pool.query("UPDATE event SET title=$1, content=$2, url=$3 WHERE id=$4 RETURNING *", 
        [title, content, url, id]);
    return result.rows[0];
};

export const deleteEventService = async (id) => {
    const result = await pool.query("DELETE FROM event WHERE id = $1", [id]);
    return result.rows[0];
};

export const orderEventsService = async (ids) => {
    // This ensures if any update fails, ALL previous updates are rolled back.
    for (let i = 0; i < ids.length; i++) {
        const sql = `
            UPDATE event
            SET position = $1
            WHERE id = $2;
        `;
        // $1 is the new position, $2 is the identifier (old position)
        await pool.query(sql, [i+1, ids[i]]);
    }
    return true;
};

