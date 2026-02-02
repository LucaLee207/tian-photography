import pool from "../config/db.js"


export const getAllArtworksService = async (category) => {
    const result = await pool.query("SELECT * FROM artwork WHERE category = $1 ORDER BY position ASC", [category]);
    return result.rows;
};

export const getArtworkByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM artwork where id = $1", [id]);
    return result.rows[0];
};

export const createArtworkService = async (position, url, category, filename, width, height) => {
    const result = await pool.query("INSERT INTO artwork (position, url, category, filename, width, height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
        [position, url, category, filename, width, height]);
    return result.rows[0];
};

export const updateArtworkService = async (id, url) => {
    const result = await pool.query("UPDATE artwork SET  url=$1 WHERE id=$2 RETURNING *", 
        [url, id]);
    return result.rows[0];
};

export const deleteArtworkService = async (id) => {
    const result = await pool.query("DELETE FROM artwork WHERE id = $1", [id]);
    return result.rows[0];
};

export const orderArtworksService = async (ids) => {
    // This ensures if any update fails, ALL previous updates are rolled back.
    for (let i = 0; i < ids.length; i++) {
        const sql = `
            UPDATE artwork
            SET position = $1
            WHERE id = $2;
        `;
        // $1 is the new position, $2 is the identifier (old position)
        await pool.query(sql, [i+1, ids[i]]);
    }

    const result = await pool.query("SELECT * FROM artwork ORDER BY position ASC");
    return result.rows;
   
};

