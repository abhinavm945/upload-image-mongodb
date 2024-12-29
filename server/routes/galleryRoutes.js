// In your `uploadRoutes.js` or a new `galleryRoutes.js` file
import express from 'express';
import Photo from '../models/Photo.js'; // Assuming you have the photo schema in `photoModel.js`

const router = express.Router();

// Route to get all photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
