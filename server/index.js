import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(PORT, () => {
    console.log("server has started on port 5000");
});

