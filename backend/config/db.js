import mysql from "mysql2";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

const dbHost = process.env.DB_HOST;
console.log("DB_HOST:", dbHost);
if (!dbHost) {
    console.warn("DB_HOST is not set in environment variables");
} else {
    dns.lookup(dbHost, (err, address, family) => {
        if (err) {
            console.error("DNS lookup for DB_HOST failed:", err);
        } else {
            console.log(`DB_HOST resolves to ${address} (family ${family})`);
        }
    });
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 10,
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database Connection Failed", err);
        return;
    }

    console.log("✅ MySQL Pool Created Successfully");
    connection.release();
});

export default pool;