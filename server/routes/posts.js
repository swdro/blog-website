import express from "express";

import { createPost, getPosts } from "../controllers/posts.js";

const router = express.Router();

router.post('/createpost', createPost);
router.post('/getposts', getPosts);

export default router;