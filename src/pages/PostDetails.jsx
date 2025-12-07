import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";

export default function PostDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const { user } = useContext(AuthContext);

  const load = async () => {
    const res = await api.get(`/api/posts/${id}`);
    setPost(res.data);

    const c = await api.get(`/api/comments/post/${id}`);
    setComments(c.data);
  };

  useEffect(() => { load(); }, [id]);
  useEffect(() => {
  if (post) {
      console.log("USER:", user);
      console.log("POST:", post);
    }
  }, [post, user]);

  const addComment = async () => {
    if (!content) return;
    await api.post("/api/comments", { content, postId: Number(id) });
    setContent("");
    await load();
  };

  const deleteComment = async (cid) => {
    await api.delete(`/api/comments/${cid}`);
    await load();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      <div className="text-sm text-gray-600 mb-4">
        By {post.userName}
      </div>

      {/* EDIT BUTTON */}
      {user && (user.id === post.userId || user.role === "ADMIN") && (
        <button
          onClick={() => nav(`/edit-post/${id}`)}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm mb-4"
        >
          Edit Post
        </button>
      )}

      <div className="prose mb-6">{post.content}</div>

      <div className="mt-6">
        <h3 className="text-lg">Comments</h3>

        {comments.map((c) => (
          <div key={c.id} className="border rounded p-2 my-2">
            <div className="text-sm mb-1">{c.content}</div>

            <div className="text-xs text-gray-500 flex justify-between">
              <span>{c.userName || "Anonymous"}</span>

              {(user && (user.id === c.userId || user.role === "ADMIN")) && (
                <button
                  onClick={() => deleteComment(c.id)}
                  className="text-red-600 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <div className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
          <button
            onClick={addComment}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Add Comment
          </button>
        </div>
      ) : (
        <div className="mt-4 text-sm">Login to add comments.</div>
      )}
    </div>
  );
}
