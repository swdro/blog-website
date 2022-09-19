import pool from "../db.js";

export const createPost = async (req, res) => {
    let { authorId, authorName, title, text, tags } = req.body;
    try {
        console.log(tags);
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

        const postId = createPostQuery.rows[0].id;

        // insert tags into db
        tags.forEach(async (tag) => {
            const inputTagsQuery = await pool.query(
                "INSERT INTO tags (tagName, postId) VALUES ($1, $2) RETURNING * ", 
                [tag, postId]
            );
            console.log(inputTagsQuery.rows[0]);
        });

        // success
        res.status(200).json({message: "post successfully created"});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong... we were unable to submit the post" });
    }
}

export const getPosts = async (req, res) => {
    const sortByObj = {
        "Title": "title",
        "Date Created": "dateCreated"
    }
    const orderObj = {
        "Descending": "DESC",
        "Ascending": "ASC"
    }
    const POSTSPERPAGE = 8;
    const page = req.body.page;
    const sortBy = sortByObj[req.body.sortBy];
    const order = orderObj[req.body.order];
    const selectedTag = req.body.selectedTag;
    try {
        let queryTotalPosts;
        if (selectedTag) {  // check for selected tag in headers
            // query count of posts with selected tag
            queryTotalPosts = await pool.query(
                `SELECT COUNT(*)
                FROM tags t
                INNER JOIN posts p on t.postId = p.id
                WHERE t.tagName = $1`,
                [selectedTag]
            );
        } else {
            // get total posts
            queryTotalPosts = await pool.query(
                "SELECT COUNT(*) FROM posts"
            );
        }

        const totalPosts = parseInt(queryTotalPosts.rows[0].count);
        const totalPages = Math.ceil(totalPosts/POSTSPERPAGE);
        let offset = POSTSPERPAGE * (page - 1);

        // check page request is valid
        if (page <= 0 || page > totalPages) {
            //return res.status(404).json({ message: "Page does not exist" });
            offset = 0;
        }

        let queryPosts;
        if (selectedTag) {
            // query posts with selected tag
            queryPosts = await pool.query(
                `SELECT *
                FROM tags t
                INNER JOIN posts p on t.postId = p.id
                WHERE t.tagName = $1
                ORDER BY ${sortBy} ${order} LIMIT $2 OFFSET $3`,
                [selectedTag, POSTSPERPAGE, offset]
            );
        } else {
            // query posts
            queryPosts = await pool.query(
                `SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT $1 OFFSET $2`,
                [POSTSPERPAGE, offset]
            );
        }
        
        // get tags for each post
        let posts = queryPosts.rows.map(async (post) => {
            let { id } = post;
            const queryTags = await pool.query(
                "SELECT * FROM tags WHERE tags.postId = $1",
                [id]
            );
            let tags = queryTags.rows.map((row) => row.tagname);
            return { ...post, tags };
        });
        // wait for promise to be fulfilled since map function
        // has no promise logic
        Promise.all(posts)
            .then(posts => {
                //console.log("posts: ", posts);
                res.status(200).json({ posts, totalPages });
            })
            .catch(err => {
                res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
    }
}

export const getPost = async (req, res) => {
    //console.log("req.body: ", req.body);

    const { postId } = req.body;
    //console.log(postId);

    try {
        // query post
        const queryPost = await pool.query(
            "SELECT * FROM posts WHERE posts.id = $1",
            [postId]
        );
        const post = queryPost.rows[0];
        // check if a post was found
        if (!post) {
            return res.status(500).json({ message: "Invalid Post ID" });
        }
        // get tags for each post
        let posts = queryPost.rows.map(async (post) => {
            let { id } = post;
            const queryTags = await pool.query(
                "SELECT * FROM tags WHERE tags.postId = $1",
                [id]
            );
            let tags = queryTags.rows.map((row) => row.tagname);
            return { ...post, tags };
        });
        // wait for promise to be fulfilled since map function
        // has no promise logic
        Promise.all(posts)
            .then(posts => {
                //console.log("posts: ", posts);
                res.status(200).json({ posts });
            })
            .catch(err => {
                res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something went wrong on our end... we were unable to retrieve the blog posts" });
    }
}