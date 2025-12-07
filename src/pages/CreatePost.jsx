import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function CreatePost(){
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [categoryId,setCategoryId]=useState("");
  const [cats,setCats]=useState([]);
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
  api.get("/api/categories")
    .then(r => {
      console.log("CATEGORIES SUCCESS:", r.data);
      setCats(r.data);
    })
    .catch(err => {
      console.log("CATEGORIES ERROR:");
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);
    });
}, []);



  const submit = async () => {
    await api.post("/api/posts", {
      title,
      content,
      userId: user?.id,
      categoryId
    });
    nav("/");
  };

  return (
    <div className="max-w-2xl">
      <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 mb-2" placeholder="Title"/>
      
      <select
        value={categoryId}
        onChange={e => setCategoryId(Number(e.target.value))}
        className="w-full border p-2 mb-2"
      >
        <option value="">Select category</option>
        {cats.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      
      <textarea value={content} onChange={e=>setContent(e.target.value)} rows={8} className="w-full border p-2 mb-2" />
      
      <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </div>
  );
}
