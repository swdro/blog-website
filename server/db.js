import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const Pool = pg.Pool;

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export default pool;