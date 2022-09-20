import pool from "../db.js";

export const getFrequentTags = async (req, res) => {
    try {
        const inputTagsQuery = await pool.query(
            "SELECT tagname FROM tags GROUP BY tagname ORDER BY count(tagname) DESC LIMIT 5", 
        );
        const mostFrequentTags = inputTagsQuery.rows.map((tagObj) => tagObj.tagname);
        res.status(200).json({ tags: mostFrequentTags });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong... we were unable to submit the post" });
    }
};

