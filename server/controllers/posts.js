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
    const POSTSPERPAGE = 8;
    const { page } = req.body;
    console.log("get posts endpoint");
    console.log(req.body);
    try {
        // get total posts
        const queryTotalPosts = await pool.query(
            "SELECT COUNT(*) FROM posts"
        );

        const totalPosts = parseInt(queryTotalPosts.rows[0].count);
        const totalPages = Math.ceil(totalPosts/POSTSPERPAGE);
        let offset = POSTSPERPAGE * (page - 1);

        // check page request is valid
        if (page <= 0 || page > totalPages) {
            //return res.status(404).json({ message: "Page does not exist" });
            offset = 0;
        }

        // query posts
        const queryPosts = await pool.query(
            "SELECT * FROM posts LIMIT $1 OFFSET $2",
            [POSTSPERPAGE, offset]
        );

        console.log(totalPages);

        // success
        res.status(200).json({ posts: queryPosts.rows, totalPages });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
    }
}