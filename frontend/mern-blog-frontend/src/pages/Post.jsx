import React, { useEffect, useState } from "react";
import { getPosts, getCategories } from "../services/api";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page, search, category]);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getPosts(page, search, category);
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
