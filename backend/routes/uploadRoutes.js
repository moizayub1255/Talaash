// routes/uploadRoutes.js (or jahan bhi ho)

import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

export default router;
