import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import CategoryBadge from "../components/CategoryBadge";

export default function Categories() {
  const { id } = useParams(); // category ID from URL (optional)
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories
  const fetchCats = async () => {
    try {
      const r = await api.get("/api/categories");
      setCats(r.data);

      // If URL has id, set selectedCategory
      if (id) {
        const cat = r.data.find(c => c.id === Number(id));
        if (cat) {
          setSelectedCategory(cat);
          fetchPostsByCategory(cat.id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Fetch posts by category
  const fetchPostsByCategory = async (categoryId) => {
    setLoadingPosts(true);
    setError("");
    try {
      const res = await api.get(`/api/posts/category/${categoryId}`);
      setPosts(res.data);
      const cat = cats.find(c => c.id === categoryId);
      setSelectedCategory(cat);
      // Update URL
      navigate(`/categories/${categoryId}`, { replace: true });
    } catch (err) {
      setError("Failed to load posts for this category.");
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Categories</h2>
      <div className="flex gap-2 flex-wrap mb-6">
        {cats.length === 0 ? (
          <div>No categories available</div>
        ) : (
          cats.map(c => (
            <CategoryBadge 
              key={c.id} 
              category={c} 
              onClick={() => fetchPostsByCategory(c.id)}
            />
          ))
        )}
      </div>

      {selectedCategory && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Posts in "{selectedCategory.name}"
          </h3>

          {loadingPosts ? (
            <div>Loading posts...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : posts.length === 0 ? (
            <div>No posts in this category.</div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="border rounded p-4 shadow-sm">
                  <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                  <p className="text-gray-700 mb-2">{post.content.slice(0, 150)}...</p>
                  <Link 
                    to={`/post/${post.id}`} 
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Post
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

