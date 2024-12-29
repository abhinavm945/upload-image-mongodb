import Photo from '../models/Photo.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save in an 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Controller for handling file upload
export const uploadPhoto = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Read the file and convert it to base64
    const img = fs.readFileSync(path.join(__dirname, `../uploads/${file.filename}`));
    const encode_image = img.toString('base64');

    // Create new Photo document
    const newPhoto = new Photo({
      filename: file.filename,
      contentType: file.mimetype,
      imageBase64: encode_image,
    });

    // Save photo to database
    await newPhoto.save();

    res.status(201).json({
      message: 'Photo uploaded successfully',
      photoId: newPhoto._id,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).send('Internal server error');
  }
};

export default upload;
