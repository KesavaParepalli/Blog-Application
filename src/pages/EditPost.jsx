import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);   // FIXED URL
        const p = res.data;

        // Authorization check
        if (user && p.userId !== user.id && user.role !== "ADMIN") {
          setError("You are not authorized to edit this post.");
        } else {
          setPost(p);
        }
      } catch (err) {
        setError("Failed to load post.");
      }
    };

    loadPost();
  }, [id, user]);

  const save = async () => {
    try {
      await api.put(`/api/posts/${id}`, {   // FIXED URL
        title: post.title,
        content: post.content,
        categoryId: post.categoryId         // IMPORTANT if backend needs it
      });

      nav(`/post/${id}`);
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        rows={6}
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
