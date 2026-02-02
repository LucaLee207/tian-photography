import pool from "../config/db.js"


export const getAllEventsService = async (category) => {
    const result = await pool.query("SELECT * FROM event WHERE category = $1 ORDER BY position ASC", [category]);
    return result.rows;
};

export const getEventByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM event where id = $1", [id]);
    return result.rows[0];
};

export const createEventService = async (position, title, content, url, category, fileName, hovertext, width, height) => {
    const result = await pool.query("INSERT INTO event (position, title, content, url, category, filename, hovertext, width, height) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", 
        [position, title, content, url, category, fileName, hovertext, width, height]);
    return result.rows[0];
};

export const updateEventService = async (id, title, content, hovertext) => {
    const result = await pool.query("UPDATE event SET title=$1, content=$2, hovertext=$3 WHERE id=$4 RETURNING *", 
        [title, content, hovertext , id]);
    return result.rows[0];
};

export const deleteEventService = async (id) => {
    const result = await pool.query("DELETE FROM event WHERE id = $1", [id]);
    return result.rows[0];
};

export const deleteEventDetailService = async(id) =>{
    const result = await pool.query("DELETE FROM artwork WHERE category = $1", [id]);
    return result.rows[0];
}

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

    const result = await pool.query("SELECT * FROM event ORDER BY position ASC");
    return result.rows;
   
};

