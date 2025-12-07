import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";

export default function MyPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    if (!user) return;
    try {
      const res = await api.get(`/api/posts/user/${user.id}`);
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to see your posts.</div>;
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>

      {posts.length === 0 ? (
        <div>You have not created any posts yet.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-2">{post.content.slice(0, 150)}...</p>
              <div className="flex gap-2">
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>
                <Link
                  to={`/edit-post/${post.id}`}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
