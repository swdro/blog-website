import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import tagRoutes from './routes/tags.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const PROTOCOL = process.env.PROTOCOL;

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/tags', tagRoutes);

if (PROTOCOL === 'http') {
    app.listen(PORT, () => {
        console.log("server has started on port 5000");
    });
} else if (PROTOCOL === 'https') {
    const key = fs.readFileSync('/etc/letsencrypt/live/thesoftwareblog.net/privkey.pem');
    const cert = fs.readFileSync('/etc/letsencrypt/live/thesoftwareblog.net/cert.pem');
    const ca = fs.readFileSync('/etc/letsencrypt/live/thesoftwareblog.net/chain.pem');
    const options = {
            key,
            cert,
            ca
    };
    https.createServer(options, app).listen(PORT);
}

