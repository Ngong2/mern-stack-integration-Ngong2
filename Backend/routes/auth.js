// routes/posts.js - MAKE SURE THIS IS CORRECT
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware'); // Make sure this is imported

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

// 🚨 IMPORTANT: NO auth middleware on GET routes
router.get('/', getPosts);
router.get('/:id', getPost);

// These routes NEED auth
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;