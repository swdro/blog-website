import pool from "../db.js";

export const createPost = async (req, res) => {
    let { authorId, authorName, title, text, tags } = req.body;
    try {
        // check to see if all fields were filled out
        if (!authorId || !authorName) {
            return res.status(404).json({ message: "User must login again" });
        } else if (!title || !text || !tags) {
            return res.status(404).json({ message: "All fields are required" });
        }

        // get user info
        const queryUser = await pool.query(
            "SELECT * FROM accounts AS acc WHERE acc.id = $1",
            [authorId]
        );

        // check to make sure user exists and has admin rights
        if (!queryUser.rowCount) {
            return res.status(404).json({ message: "User does not exist" });
        } else if (!queryUser.rows[0].adminrole) {
            return res.status(404).json({ message: "User does not have posting privelege" });
        }

        // create post
        const createPostQuery = await pool.query(
            "INSERT INTO posts (authorId, authorName, title, body) VALUES ($1, $2, $3, $4) RETURNING * ", 
            [authorId, authorName, title, text]
        );

        // check if post was successfully created
        if (!createPostQuery.rowCount) {
            return res.status(404).json({ message: "Error occurred when creating post" });
        }

        // success
        res.status(200).json({message: "post successfully created"});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong... we were unable to submit the post" });
    }
}

export const getPosts = async (req, res) => {
    console.log("get posts endpoint");
    try {
        // query posts
        const queryPosts = await pool.query(
            "SELECT * FROM posts"
        );

        console.log(queryPosts)

        // success
        res.status(200).json({ posts: queryPosts.rows });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
    }
}