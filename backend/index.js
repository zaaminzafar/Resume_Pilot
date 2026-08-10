import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import "./config/db.js";
import { swaggerSpec } from "./config/swagger.js";
import { initKeepAlive } from "./services/keepAlive.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", userRoutes);
app.use("/api", healthRoutes);

app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Resume Builder Backend Running 🚀");
});

// Initialize database keep-alive service
initKeepAlive();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`📚 Swagger API docs available at http://localhost:${PORT}/api-docs`);
});