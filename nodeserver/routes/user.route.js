import express from 'express';
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
import { signup, signin } from '../controllers/auth.controller.js';
import { test, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import AddBook from '../models/AddBook.model.js';
import User from '../models/user.model.js';  // Add this import

const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.use(bodyParser.json());

// Debugging: Log every incoming request to this router
router.use((req, res, next) => {
  console.log(`\n--- Incoming request: ${req.method} ${req.originalUrl} ---`);
  console.log('Headers:', req.headers);
  next();
});

// Authentication routes
router.post('/signup', signup);
router.post('/signin', signin);

router.get('/test', test);

// Profile routes
router.get('/profile', getUserProfile); // Fetches user profile data
router.put('/profile', updateUserProfile); // Updates user profile data

// Add Book Route (with image upload)
router.post('/add-book', upload.array('images', 10), async (req, res) => {
  try {
    console.log('Received fields:', req.body);
    console.log('Received files:', req.files);
    // Build book data
    const bookData = {
      ...req.body,
      images: req.files ? req.files.map(f => f.filename) : []
    };
    if (typeof bookData.category === 'string') {
      bookData.category = [bookData.category];
    }
    if (bookData.pages) bookData.pages = Number(bookData.pages);
    if (bookData.price) bookData.price = Number(bookData.price);
    const newBook = new AddBook(bookData);
    await newBook.save();
    res.json({ message: 'Book added successfully!' });
  } catch (err) {
    console.error('AddBook Error:', err);
    res.status(500).json({ message: 'Failed to add book', error: err.message, stack: err.stack });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude password field
    console.log('Fetched users:', users); // Add logging
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Add error logging
    res.status(500).json({ 
      message: 'Failed to fetch users',
      error: error.message 
    });
  }
});

// Add delete route before export
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

export default router;