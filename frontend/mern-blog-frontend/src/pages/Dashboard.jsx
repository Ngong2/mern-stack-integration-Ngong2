import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPosts, deletePost, createPost, updatePost } from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    body: "",
    author: "",
    category: "",
    status: "draft",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);

  const categories = [
    "Technology", "Lifestyle", "Travel", "Health", "Sports", "Education", "Food", "Entertainment",
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      const posts = Array.isArray(data.posts) ? data.posts : data;
      setUserPosts(posts);
      setStats({
        total: posts.length,
        published: posts.filter((p) => p.status === "published").length,
        draft: posts.filter((p) => p.status === "draft").length,
      });
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      loadPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      status: post.status,
    });
    setFile(null);
    setPreview(post.image ? `https://mern-stack-integration-ngong2.onrender.com${post.image}` : null);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setForm({ title: "", body: "", author: "", category: "", status: "draft" });
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.author || !form.category)
      return alert("Please fill all fields");

    const formData = new FormData();
    for (const key in form) formData.append(key, form[key]);
    if (file) formData.append("image", file);

    try {
      setSaving(true);
      if (editingPost) {
        await updatePost(editingPost._id, formData);
        alert("✅ Post updated successfully!");
      } else {
        await createPost(formData);
        alert("✅ Post created successfully!");
      }
      handleCancelEdit();
      loadPosts();
    } catch (err) {
      console.error("Error saving post:", err);
      alert("❌ Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleCancelEdit}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          {editingPost ? "Cancel Edit" : "Create Post"}
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Posts" value={stats.total} />
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Drafts" value={stats.draft} />
      </section>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto"
      >
        <h2 className="text-lg font-semibold text-gray-800">{editingPost ? "Edit Post" : "Create Post"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <textarea
          rows="4"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400"
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-64 object-cover rounded mt-2"
          />
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg transition duration-300"
        >
          {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Posts List */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Your Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : userPosts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all duration-300"
              >
                {post.image && (
                  <img
                    src={`https://mern-stack-integration-ngong2.onrender.comg${post.image}`}
                    alt={post.title}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500">👤 {post.author}</p>
                  <p className="text-sm text-gray-500">🏷️ {post.category}</p>
                  <p className="text-sm text-gray-500">🕒 Created: {formatDateTime(post.createdAt)}</p>
                  <p className="text-sm text-gray-500">🕒 Updated: {formatDateTime(post.updatedAt || post.createdAt)}</p>

                  <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(post)} className="text-sky-600 hover:underline text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:underline text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center hover:shadow-md transition">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);
