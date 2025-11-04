const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true }, // use 'content' instead of 'body'
    category: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    image: { type: String, default: null },
    author: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// ✅ Prevent OverwriteModelError
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
