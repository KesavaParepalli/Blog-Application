import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  // Fetch posts (all, search, or by category)
  const fetchPosts = async (categoryId = null) => {
    setLoading(true);
    try {
      let res;
      if (categoryId) {
        res = await api.get(`/api/posts/category/${categoryId}`);
      } else if (q) {
        res = await api.get(`/api/posts/search?keyword=${encodeURIComponent(q)}`);
      } else {
        res = await api.get("/api/posts");
      }
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  // Search when pressing Enter in input
  const handleSearch = () => {
    setSelectedCategory(null);
    fetchPosts();
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    fetchPosts(cat.id);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search posts"
          className="border px-3 py-2 flex-1 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat)}
            className={`px-3 py-1 rounded border ${selectedCategory?.id === cat.id ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {cat.name}
          </button>
        ))}
        {selectedCategory && (
          <button
            onClick={() => { setSelectedCategory(null); fetchPosts(); }}
            className="px-3 py-1 rounded border bg-gray-200"
          >
            All Posts
          </button>
        )}
      </div>

      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="grid gap-4">
          {posts.length === 0 ? (
            <div>No posts yet</div>
          ) : (
            posts.map(p => <PostCard key={p.id} post={p} />)
          )}
        </div>
      )}
    </div>
  );
}
