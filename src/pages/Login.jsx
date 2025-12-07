import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.ok) setErr(res.error?.message || "Login failed");
    else nav("/");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 mb-2" placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 mb-2" placeholder="Password" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
