import cron from "node-cron";
import connection from "../config/db.js";

/**
 * Keep-alive service to prevent Aiven MySQL free tier database from shutting down
 * Runs SELECT 1 query every 5 minutes
 */
export const initKeepAlive = () => {
    // Schedule task to run every 5 minutes
    cron.schedule("*/5 * * * *", () => {
        connection.query("SELECT 1", (err, results) => {
            if (err) {
                console.error("❌ Keep-alive query failed:", err.message);
            } else {
                console.log("✅ Keep-alive query executed at", new Date().toISOString());
            }
        });
    });

    console.log("🔄 Database keep-alive service started (every 5 minutes)");
};
