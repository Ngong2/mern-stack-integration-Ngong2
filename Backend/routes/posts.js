const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth'); // ✅ add auth middleware
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

// Get all posts for the logged-in user
router.get('/', auth, getPosts);

// Get single post for the logged-in user
router.get('/:id', auth, getPost);

//  Create a new post (with image upload)
router.post('/', auth, upload.single('image'), createPost);

// Update a post (with image upload)
router.put('/:id', auth, upload.single('image'), updatePost);

//  Delete a post
router.delete('/:id', auth, deletePost);

module.exports = router;
