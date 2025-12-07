/*import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      // backend may return { token, user } OR token string
      let token = null;
      let userObj = null;

      if (res.data && typeof res.data === "object") {
        token = res.data.token || (res.data.jwt || res.data.accessToken);
        userObj = res.data.user || res.data;
        // if res.data contains only token string inside fieldless object, handle below
      } else if (typeof res.data === "string") {
        token = res.data;
      }

      // if token not found but response is string, treat that as token
      if (!token && typeof res.data === "string") token = res.data;

      if (!token && res.headers && res.headers.authorization) {
        // in rare cases token is returned in header
        token = res.headers.authorization.replace(/^Bearer\s+/i, "");
      }

      if (!token) {
        // as fallback, if res.data has a field (like email) assume res includes user and token missing
        // you may want to throw here, but we'll proceed
        console.warn("Login response did not include a token.");
      }

      if (token) localStorage.setItem("token", token);
      if (userObj && userObj.id) {
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
      } else {
        // try to fetch profile if user not returned
        try {
          const profile = await api.get("/api/users");
          localStorage.setItem("user", JSON.stringify(profile.data));
          setUser(profile.data);
        } catch {
          // leave user null
        }
      }

      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.response?.data || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}*/

import React, { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });

      let token =
        res.data.token ||
        res.data.jwt ||
        res.data.accessToken ||
        (typeof res.data === "string" ? res.data : null);

      // save token
      if (token) localStorage.setItem("token", token);

      // check if backend returned user object
      let userObj = res.data.user;
      let userId = res.data.userId || res.data.id;

      // If backend DID return full user object
      if (userObj && userObj.id) {
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        setLoading(false);
        return { ok: true };
      }

      // If backend returned ONLY userId → fetch details
      if (userId) {
        const userRes = await api.get(`/api/users/${userId}`);
        localStorage.setItem("user", JSON.stringify(userRes.data));
        setUser(userRes.data);
        setLoading(false);
        return { ok: true };
      }

      console.warn("Login did not return user or userId.");
      setLoading(false);
      return { ok: true };

    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.response?.data || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


