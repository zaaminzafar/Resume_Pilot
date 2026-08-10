import express from "express";
import {
    createResume,
    getAllResumes,
    deleteResume,
    updateResume
} from "../controllers/resumeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createResume);

router.get("/", verifyToken, getAllResumes);

router.put("/:id", verifyToken, updateResume);

router.delete("/:id", verifyToken, deleteResume);

export default router;