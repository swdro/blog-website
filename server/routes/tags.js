import express from "express";

import { getFrequentTags } from "../controllers/tags.js";

const router = express.Router();

router.get('/getcommontags', getFrequentTags);

export default router;