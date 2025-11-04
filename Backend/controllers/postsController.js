const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// ✅ Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, body, author, category, status } = req.body;

    if (!title || !body || !author || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const post = new Post({
      title,
      body,
      author,
      category,
      status: status || 'draft',
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Get Single Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Update Post
exports.updatePost = async (req, res) => {
  try {
    const { title, body, author, category, status } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Update fields
    post.title = title || post.title;
    post.body = body || post.body;
    post.author = author || post.author;
    post.category = category || post.category;
    post.status = status || post.status;

    // Replace image if new one uploaded
    if (req.file) {
      if (post.image) {
        const oldPath = path.join(__dirname, '..', post.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      post.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.json({ message: '✅ Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: '❌ Failed to update post', error: err.message });
  }
};

// ✅ Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Delete associated image if it exists
    if (post.image) {
      const imagePath = path.join(__dirname, '..', post.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await post.deleteOne();
    res.json({ message: '✅ Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
