import express from "express";
import { markQR, markFace } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/qr", markQR);
router.post("/face", markFace);

export default router;
