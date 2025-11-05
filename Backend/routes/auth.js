// routes/posts.js
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

// ✅ Public routes (no auth required)
router.get('/', getPosts); // Remove auth middleware
router.get('/:id', getPost); // Remove auth middleware

// ✅ Protected routes (require authentication)
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;