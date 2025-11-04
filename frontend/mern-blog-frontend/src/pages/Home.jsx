import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        const published = data.filter((p) => p.status === "published");
        setPosts(published);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900">
        📚 Latest Published Posts
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No published posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-2 text-left">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-500">By {post.author} • {post.category}</p>
                <p className="text-gray-600 line-clamp-3">{post.body}</p>
                <Link
                  to={`/posts/${post._id}`}
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
