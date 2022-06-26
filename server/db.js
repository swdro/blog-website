import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: "alex",
    host: "localhost",
    port: 5432,
    database: "blog"
});

export default pool;