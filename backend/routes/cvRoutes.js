import express from 'express';
import { saveCV, getLatestCV } from '../controllers/cvController.js';

const router = express.Router();

// POST /api/v1/cv
router.post('/', saveCV);

// GET /api/v1/cv/latest?userId=...
router.get('/latest', getLatestCV);

export default router;
