import express from "express";
import connection from "../config/db.js";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API and Database Connectivity
 *     description: Returns the status of the API and database connection
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API and Database are healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "API and Database are healthy"
 *                 timestamp:
 *                   type: string
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 database:
 *                   type: string
 *                   example: "connected"
 *       500:
 *         description: Database connection failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Database connection failed"
 *                 database:
 *                   type: string
 *                   example: "disconnected"
 */
router.get("/health", (req, res) => {
    // Test database connection
    connection.query("SELECT 1", (err) => {
        if (err) {
            console.error("❌ Database connection check failed:", err.message);
            return res.status(500).json({
                status: "error",
                message: "Database connection failed",
                database: "disconnected",
                error: err.message,
                timestamp: new Date().toISOString(),
            });
        }

        console.log("✅ Database connection check successful");
        res.status(200).json({
            status: "success",
            message: "API and Database are healthy",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    });
});

export default router;
