import CV from '../models/CvModel.js';

// Save CV data
export const saveCV = async (req, res) => {
  try {
    console.log('Received CV POST:', req.body);
    if (!req.body.userId) {
      console.error('userId missing in CV POST');
      return res.status(400).json({ error: 'userId is required' });
    }
    const cv = new CV(req.body);
    await cv.save();
    res.status(201).json({ message: 'CV saved successfully', cv });
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(500).json({ error: 'Failed to save CV', details: error.message });
  }
};

// Get latest CV by userId
export const getLatestCV = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const cv = await CV.findOne({ userId }).sort({ createdAt: -1 });
    if (!cv) {
      return res.status(404).json({ error: 'No CV found for this user' });
    }
    res.json({
      _id: cv._id,
      createdAt: cv.createdAt,
      pdfBase64: cv.pdfBase64,
      name: cv.name,
      userId: cv.userId,
    });
  } catch (error) {
    console.error('Error fetching latest CV:', error);
    res.status(500).json({ error: 'Failed to fetch latest CV' });
  }
};
