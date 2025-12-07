import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminCategories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "ROLE_ADMIN") {
      nav("/");
    }
  }, [user]);

  const load = async () => {
    const r = await api.get("/api/categories");
    setCats(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!name.trim()) return;

    if (editId) {
      await api.put(`/api/categories/${editId}`, { name });
    } else {
      await api.post("/api/categories", { name });
    }

    setName("");
    setEditId(null);
    load();
  };

  const del = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/api/categories/${id}`);
    load();
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>

      {/* Add / Edit Form */}
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border px-3 py-2 flex-1 rounded"
        />
        <button
          onClick={save}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setName("");
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">ID</th>
            <th className="border px-3 py-2 text-left">Name</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cats.map((c) => (
            <tr key={c.id}>
              <td className="border px-3 py-2">{c.id}</td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2 text-center flex gap-2 justify-center">
                <button
                  onClick={() => startEdit(c)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(c.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {cats.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
