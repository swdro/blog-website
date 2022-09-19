import express from "express";

import { createPost, getPosts, getPost } from "../controllers/posts.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createpost', auth, createPost);
router.post('/getposts', getPosts);
router.post('/getpost', getPost);

export default router;