const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  image: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ link to User
}, {
  timestamps: true, // adds createdAt & updatedAt
});

module.exports = mongoose.model('Post', PostSchema);
