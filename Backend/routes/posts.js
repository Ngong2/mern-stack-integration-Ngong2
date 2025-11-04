const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', upload.single('image'), createPost);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

module.exports = router;
