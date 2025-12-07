import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/users", { name, email, password });
    nav("/login");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 mb-2" placeholder="Name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 mb-2" placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 mb-2" placeholder="Password" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Create Account</button>
    </form>
  );
}
