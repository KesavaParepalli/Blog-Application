import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <Link to={`/post/${post.id}`} className="text-xl font-semibold hover:underline">{post.title}</Link>
      <p className="text-sm text-gray-600 mt-2">{post.excerpt || (post.content?.slice(0, 140) + (post.content?.length>140 ? "..." : ""))}</p>
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span>{post.authorName || post.userName || "Unknown"}</span>
        <span>{new Date(post.createdAt || post.createdAtAt || Date.now()).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
