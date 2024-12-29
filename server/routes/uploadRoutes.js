import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Photo from '../models/Photo.js'; // Import the Photo model

const router = express.Router();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage and ensure the 'uploads/' directory exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    
    // Check if the uploads folder exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});

router.post('/uploading', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Create a new Photo instance and save it to the database
    const newPhoto = new Photo({
      filename: req.file.filename,
      contentType: req.file.mimetype,
      imageBase64: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename), { encoding: 'base64' }),
    });

    await newPhoto.save(); // Save the photo data to the database

    res.json({ fileName: req.file.filename });
    console.log("File uploaded and saved to the database");
  } catch (error) {
    console.error("Error uploading and saving file:", error);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
