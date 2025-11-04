import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format';

export default function PostCard({ post }) {
  return (
    <article className="border rounded-md shadow-sm p-4 bg-white">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
      )}
      <h3 className="text-xl font-semibold mb-1">
        <Link to={`/posts/${post._id}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="text-sm text-gray-600 mb-3">By {post.author?.name || 'Unknown'} • {formatDate(post.createdAt)}</p>
      <p className="text-gray-700 line-clamp-3">{post.body}</p>
      <div className="mt-3">
        <Link to={`/posts/${post._id}`} className="text-sm text-primary hover:underline">Read more →</Link>
      </div>
    </article>
  );
}
