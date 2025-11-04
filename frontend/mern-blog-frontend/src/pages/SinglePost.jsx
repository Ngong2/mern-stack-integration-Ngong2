import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SinglePost() {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`https://mern-stack-integration-ngong2.onrender.com/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading post...</p>;
  if (!post) return <p className="text-center py-10 text-gray-500">Post not found.</p>;

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>

      {post.image && (
        <img
          src={`https://mern-stack-integration-ngong2.onrender.com${post.image}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">By {post.author} • {post.category}</p>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {post.body}
      </div>
    </section>
  );
}
