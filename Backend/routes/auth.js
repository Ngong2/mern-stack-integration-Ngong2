// routes/posts.js - REPLACE WITH THIS EXACT CODE
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

// 🚨 CRITICAL: NO auth middleware here - PUBLIC ROUTES
router.get('/', getPosts);
router.get('/:id', getPost);

// PROTECTED ROUTES - require authentication
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;